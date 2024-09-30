import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();

app.get("/api", (req, res)=>{
    res.json({name:["rudy cfel","wielki cfel"]});
});



const httpServer = createServer(app);
httpServer.listen(8080);

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

import  crypto  from "crypto";

const crashHash = "54924f1e6be74137bd13953c34cbc0c4543a33549d8ffbefb9d4962f19dc7db5";

const salt = "000000000000000000074ec3f344eb9e5a3304c77368a8df56a12b0319065fc9";

function saltHash(hash) {
  return crypto
    .createHmac("sha256", hash)
    .update(salt)
    .digest("hex");
}

function generateHash(seed) {
  return crypto
    .createHash("sha256")
    .update(seed)
    .digest("hex");
}

function divisible(hash, mod) {
  var val = 0;

  var o = hash.length % 4;
  for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
    val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
  }

  return val === 0;
}

function crashPointFromHash(serverSeed) {
  const hash = crypto
    .createHmac("sha256", serverSeed)
    .update(salt)
    .digest("hex");

  const hs = parseInt(100 / 3);
  if (divisible(hash, hs)) {
    return 1;
  }

  const h = parseInt(hash.slice(0, 52 / 4), 16);
  const e = Math.pow(2, 52);

  return Math.floor((100 * e - h) / (e - h)) / 100.0;
}


function verifyCrash() {
  const gameResult = crashPointFromHash(crashHash);

  return gameResult;
}

console.log(verifyCrash());
