import { Server } from "socket.io";
import httpServer from "./httpServ.mjs";


const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:3000",
    }
});

io.on("connection", (socket) => {
    socket.on("disconnecting", () => {
        console.log("dc");
    });
});

const chatNS = io.of("/chatNS");


export default io;
