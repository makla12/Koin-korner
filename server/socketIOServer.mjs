import { Server } from "socket.io";
import { logIn, register, saveMessage, getMessages, getServerSeed, getPublicSeed, checkUsernameAndEmail } from "./sql.mjs";
import nodemailer from "nodemailer";

const createSocketIOServer = (httpServer, corsOptions, sessionMiddleware) => {
    const io = new Server(httpServer, {
        cors:corsOptions
    });
    io.engine.use(sessionMiddleware);


    //Stworzenie przestrzeni nazw dla czatu
    const chatNS = io.of("/chatNS")

    //Zajęcie się połączeniem z czatu
    chatNS.on("connection", (socket) => {
        const req = socket.request;
        console.log("conected");

        //Odświerzanie sesji przy każdej wiadomości
        socket.use((__, next) => {
            req.session.reload((err) => {
                if (err) {
                    socket.disconnect();
                } 
                else {
                    next();
                }
            });
        });
        
        //Reakcja serwera przy rozłączeniu użytkownika
        socket.on("disconnecting", () => {
            console.log("dc");
        });

        //Reakcja i odpowiedz serwera na wysłanie wiadomości

        socket.on("sendMessage", (message) => {
            if(!req.session.isLoggedIn){ //Sprawdzenie czy użytkownik jest zalogowany
                return ;
            }
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
}
export default createSocketIOServer;