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
    console.log(socket.id);
    socket.on("rand",()=>{
        socket.emit("randNum",Math.floor(Math.random() * 20)); 
    });
});


export default io;