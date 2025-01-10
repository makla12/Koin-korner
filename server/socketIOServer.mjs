import { Server } from "socket.io";
import { saveMessage, getServerSeed, getPublicSeed, getGameRound, saveRouletteRoll, getLast10RouletteRolls, saveBet, } from "./sql.mjs";
import { rollFromSeed } from "./games.mjs";
import { getTrueBalance, rouletteBets } from "./bets.mjs";

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

    const clearBets = () => {
        rouletteBets.splice(0,rouletteBets.length);
    }

    const rollRoulette = async () => {
        const [serverSeedId, serverSeed] = await getServerSeed();
        const [publicSeedId, publicSeed] = await getPublicSeed(1);
        const round = await getGameRound(1);
        
        const score = rollFromSeed(serverSeed, publicSeed, round.toString());
        const gameId = await saveRouletteRoll(round, score, serverSeedId, publicSeedId);
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

        clearBets();
    }

    setInterval(()=>{
        rollRoulette();
        roulletteTimeStart = Date.now();
    }, timeBetweenRols);

    rouletteNS.on("connection", async (socket)=>{
        console.log("connect");
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
            if(await getTrueBalance(req.session.userId) < bet) return;

            const betObj = {
                userId: req.session.userId,
                name: req.session.username,
                bet: Number(bet),
                choice: choice,
            }
            rouletteBets.push(betObj);
            rouletteNS.emit("addBet", betObj);
            socket.emit("confirmBet");
        });
    });
}
export default createSocketIOServer;