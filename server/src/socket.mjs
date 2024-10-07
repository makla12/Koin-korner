import { Server } from "socket.io";
import httpServer from "./httpServ.mjs";


const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:5173",
    }
});

io.on("connection", (socket) => {
    socket.on("disconnecting", () => {
        console.log("dc");
    });
    
    socket.on("sendMessage", ()=>{

    });
});


export default io;
