import { Server } from "socket.io";
import { saveMessage, getServerSeed, getPublicSeed, getGameRound, saveGameRound, getLast10RouletteRolls, saveBet, } from "./sql.mjs";
import { rollFromSeed, crashPointFromHash, crashPointFromTime, crashPointToTime } from "./games.mjs";
import { getTrueBalance, checkIfInBets, rouletteBets, crashBets } from "./bets.mjs";

const createSocketIOServer = (httpServer, corsOptions, sessionMiddleware) => {
    const io = new Server(httpServer, {
        cors:corsOptions
    });
    io.engine.use(sessionMiddleware);

//Chat
    const chatNS = io.of("/chatNS");
    chatNS.on("connection", (socket) => {
        const req = socket.request;
        socket.use((__, next) => {
            req.session.reload((err) => {
                if (err) socket.disconnect();

                else next();
            });
        });
        
        socket.on("sendMessage", (message) => {
            if(!req.session.isLoggedIn) return ; 

            //Zdobycie teraźniejszej godziny
            const datenow = new Date(Date.now()); 
            const year = datenow.getFullYear();
            const month = datenow.getMonth() + 1;
            const day = datenow.getDate();
            const time = datenow.toTimeString().substring(0,8);
            const dateSting = `${year}-${month < 10 ? "0" : ""}${month}-${day} ${time}`;
            saveMessage(req.session.userId, dateSting, message);

            //Wysłanie wiadomości do użytkowników
            chatNS.emit("message", {
                username:req.session.username,
                date:dateSting,
                message:message
            });
        });
    });

//Rolulette
    const rouletteNS = io.of("/rouletteNS");
    const timeBetweenRols = 15000 + 3000 + 1000;
    let roulletteTimeStart = Date.now();

    const clearRouletteBets = () => {
        rouletteBets.splice(0,rouletteBets.length);
    }

    const rollRoulette = async () => {
        const [serverSeedId, serverSeed] = await getServerSeed();
        const [publicSeedId, publicSeed] = await getPublicSeed(1);
        const round = await getGameRound(1);
        
        const score = rollFromSeed(serverSeed, publicSeed, round.toString());
        const gameId = await saveGameRound(round, score, serverSeedId, publicSeedId);
        rouletteNS.emit("roll", score);

        rouletteBets.forEach((user)=>{
            if(!isNaN(Number(user.choice))){
                if(Number(user.choice) == score){
                    saveBet(user.userId, gameId, user.bet, 14);
                    return;
                }
            }

            switch(user.choice){
                case "RED":
                    if(score <= 7 && score != 0){
                        saveBet(user.userId, gameId, user.bet, 2);
                        return;
                    } 
                    break;

                case "BLACK":
                    if(score > 7){ 
                        saveBet(user.userId, gameId, user.bet, 2);
                        return;
                    }
                    break;
                
                case "EVEN":
                    if(score % 2 == 0 && score != 0){ 
                        saveBet(user.userId, gameId, user.bet, 2);
                        return;
                    }
                    break;

                case "ODD":
                    if(score % 2 != 0){ 
                        saveBet(user.userId, gameId, user.bet, 2);
                        return;
                    }
                    break;

                case "K":
                    if(score == 0){
                        saveBet(user.userId, gameId, user.bet, 14);
                        return;
                    }
                    break;
            }
            saveBet(user.userId, gameId, user.bet, 0);

        });

        clearRouletteBets();
    }

    setInterval(()=>{
        rollRoulette();
        roulletteTimeStart = Date.now();
    }, timeBetweenRols);

    rouletteNS.on("connection", async (socket)=>{
        console.log("connect to roulette");
        socket.emit("initialParams", roulletteTimeStart, rouletteBets, await getLast10RouletteRolls() );
        const req = socket.request;
        socket.use((__, next) => {
            req.session.reload((err) => {
                if (err) socket.disconnect();

                else next();
            });
        });

        socket.on("bet",async (choice, bet) => {
            if(!req.session.isLoggedIn) return;
            if(bet <= 0) return;
            if(Date.now() - roulletteTimeStart < 4000) return;
            if(checkIfInBets(rouletteBets, req.session.userId)) return;
            if(await getTrueBalance(req.session.userId) < bet) return;

            const betObj = {
                userId: req.session.userId,
                name: req.session.username,
                bet: Number(bet),
                choice: choice,
                active: true,
            }
            rouletteBets.push(betObj);
            rouletteNS.emit("addBet", betObj);
            socket.emit("confirmBet");
        });
    });

//Crash
    const crashNS = io.of("/crashNS");
    let crashTimeStart = Date.now();
    let isCrashed = false;
    let crashTime = Date.now();

    const crash = () => {
        crashTime = Date.now();
        isCrashed = true;
        crashNS.emit("crash");
    }

    const startCrash = async () => {
        isCrashed = false;
        crashTimeStart = Date.now();
        const [serverSeedId, serverSeed] = await getServerSeed();
        const [publicSeedId, publicSeed] = await getPublicSeed(1);
        const round = await getGameRound(1);
        
        const crashScore = crashPointFromHash(serverSeed, publicSeed, round.toString() );
        const crashScoreTime = crashPointToTime(crashScore) * 1000;
        console.log(crashScore);
        setTimeout(()=>{
            crash();
            saveGameRound(round, crashScore, serverSeedId, publicSeedId);
            setTimeout(()=>{
                startCrash();
            },1000);
        },5000 + crashScoreTime);
    }

    startCrash();

    crashNS.on("connection", async (socket)=>{
        console.log("connect to crash");
        socket.emit("initialParams", crashTimeStart, isCrashed, crashTime, crashBets);

        const req = socket.request;
        socket.use((__, next) => {
            req.session.reload((err) => {
                if (err) socket.disconnect();

                else next();
            });
        });

        socket.on("bet",async (betNum, bet) => {
            if(!req.session.isLoggedIn) return;
            if(bet <= 0) return;
            if(Date.now() - crashTimeStart > 5000) return;
            if(checkIfInBets(crashBets, req.session.userId, value => value.betNum == betNum )) return;
            if(await getTrueBalance(req.session.userId) < bet) return;

            const betObj = {
                userId: req.session.userId,
                name: req.session.username,
                bet: Number(bet),
                auto:0,
                cashOutMult:0,
                betNum:betNum,
            }

            crashBets.push(betObj);
            crashNS.emit("addBet", betObj);
            socket.emit("confirmBet");
        });

        socket.on("cashOutBet", async (betNum) => {
            if(!req.session.isLoggedIn) return;
            if(isCrashed) return;
            if(Date.now() - crashTimeStart < 5000) return;
            if(!checkIfInBets(crashBets, req.session.userId, value => value.betNum == betNum && value.active )) return;

            const betIndex = crashBets.findIndex( value => value.userId == req.session.userId && value.betNum == betNum);
            crashBets[betIndex].active = false;
        });

    });
}
export default createSocketIOServer;