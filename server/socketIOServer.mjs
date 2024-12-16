import { Server } from "socket.io";
import { saveMessage, getServerSeed, getPublicSeed, getGameRound, saveRouletteRoll, getLast10RouletteRolls,  } from "./sql.mjs";
import { rollFromSeed } from "./games.mjs";

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
    const timeBetweenRols = 20000 + 3000 + 1000;
    let roulletteTimeStart = Date.now();
    let rouletteBets = [ ];

    const clearBets = () => {
        rouletteBets = [];
    }

    const rollRoulette = async () => {
        const [serverSeedId, serverSeed] = await getServerSeed();
        const [publicSeedId, publicSeed] = await getPublicSeed(1);
        const round = await getGameRound(1);
        
        const score = rollFromSeed(serverSeed, publicSeed, round.toString() );
        rouletteNS.emit("roll", score);

        rouletteBets.forEach((user)=>{
            if(!isNaN(Number(user.bet)) || score == 0){
                if(Number(user.bet) == score) console.log(user.userId, "win", user.amount * 14);
            }
            else{
                switch(user.bet){
                    case "Red":
                        if(score <= 7) console.log(user.userId, "win", user.amount * 2);
                        break;

                    case "Black":
                        if(score > 7) console.log(user.userId, "win", user.amount * 2);
                        break;
                    
                    case "Even":
                        if(score % 2 == 0) console.log(user.userId, "win", user.amount * 7);
                        break;

                    case "Odd":
                        if(score % 2 != 0) console.log(user.userId, "win", user.amount * 7);
                        break;
                }
            }
        });

        clearBets();
        saveRouletteRoll(round, score, serverSeedId, publicSeedId);
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

        socket.on("bet", (choice, bet) => {
            if(!req.session.isLoggedIn) return;
            if(bet <= 0) return;

            const betObj = {
                userId: 0,
                name: req.session.username,
                bet: Number(bet),
                choice: choice,
            }
            rouletteBets.push(betObj);
            rouletteNS.emit("addBet", betObj);
        });
    });
}
export default createSocketIOServer;