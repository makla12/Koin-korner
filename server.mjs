import { createServer } from "http";
import { parse } from "url";
import { readFile } from "fs";
import { Server } from "socket.io";

const httpServer = createServer( (req, res) => {
    let q = parse(req.url);
    let fileneme = "." + q.pathname;
    if(fileneme === "./") fileneme = "./index.html";
    readFile(fileneme, (err,data)=>{
        if(err){
            res.writeHead(404,{"Content-type" : "text/html"});
            return res.end("404 Error Not found");
        }
        res.writeHead(200,{"Content-type" : "text/html"});
        res.write(data);5
        return res.end();
    })

}).listen(80);

const io = new Server(httpServer,{});
const crash = io.of("/crash");

io.on("connection", (socket)=>{

})

crash.on("connection", (socket)=>{

})