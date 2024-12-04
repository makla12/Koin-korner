import { Server } from "socket.io";
import { saveMessage, getServerSeed, getPublicSeed, getGameRound, saveRouletteRoll } from "./sql.mjs";
import { rollFromSeed } from "./games.mjs"

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
    let rouletteBets = [
        {userId:1, amount:100.00, bet:"1"},
        {userId:2, amount:100.00, bet:"2"},
        {userId:0, amount:100.00, bet:"3"},
        {userId:3, amount:100.00, bet:"4"},
        {userId:4, amount:100.00, bet:"5"},
        {userId:5, amount:100.00, bet:"6"},
        {userId:6, amount:100.00, bet:"7"},
        {userId:7, amount:100.00, bet:"8"},
        {userId:8, amount:100.00, bet:"9"},
        {userId:9, amount:100.00, bet:"10"},
        {userId:10, amount:100.00, bet:"11"},
        {userId:11, amount:100.00, bet:"12"},
        {userId:12, amount:100.00, bet:"13"},
        {userId:13, amount:100.00, bet:"14"},
        {userId:14, amount:100.00, bet:"0"},
        {userId:15, amount:100.00, bet:"Red"},
        {userId:16, amount:100.00, bet:"Black"},
        {userId:17, amount:100.00, bet:"Even"},
        {userId:18, amount:100.00, bet:"Odd"},
    ];

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

        saveRouletteRoll(round, score, serverSeedId, publicSeedId);
    }

    setInterval(()=>{
        rollRoulette();
        roulletteTimeStart = Date.now();
    }, timeBetweenRols);

    rouletteNS.on("connection", (socket)=>{
        console.log("connect");
        socket.emit("time", roulletteTimeStart);
        const req = socket.request;
        socket.use((__, next) => {
            if(err) socket.disconnect();

            else next();
        });

        socket.on("bet", ()=>{
            console.log(req.session.userId);
        });
    });
}
export default createSocketIOServer;