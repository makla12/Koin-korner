// import db from './src/mysql.mjs';
import express from "express";
import session from 'express-session';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";

import {LogIn} from "./src/mysql.mjs";
import { time } from "console";

const sessionMiddleware = session({
    secret: "kksecret",
    resave: false,
    saveUninitialized: true,
});

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['POST', 'GET'],
    credentials: true
};

const app = express();
app.use(express.json());
app.use(sessionMiddleware);
app.use(cors(corsOptions));


app.get("/auth/checkLogIn", (req, res) => {
    res.json({
        isLogedIn:(req.session.isLogedIn == undefined ? false : req.session.isLogedIn),
        username:req.session.username
    });
});

app.post("/auth/logIn",async (req, res)=>{
    if(req.body.username == undefined || req.body.password == undefined){
        return 0;
    }
    let loginRes = await LogIn(req.body.username, req.body.password);
    req.session.isLogedIn = loginRes == 0;
    req.session.username = req.body.username;
    res.json({suc:loginRes == 0});
});

app.post("/auth/logOut", (req, res)=>{
    req.session.isLogedIn = false;
    res.json({suc:true});
});


app.get("/app/chatHistory", (req, res) => {
    res.json({messages:[
        {user:"makla", time:"13:46", message:"Rudy to cwel"},
        {user:"rudy", time:"13:47", message:"To prawda"}
    ]});
});









const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:corsOptions
});

io.engine.use(sessionMiddleware);

const chatNS = io.of("/chatNS")
chatNS.on("connection", (socket) => {
    const req = socket.request;
    console.log("conected");

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
    
    socket.on("disconnecting", () => {
        console.log("dc");
    });

    socket.on("sendMessage", (message) => {
        if(!req.session.isLogedIn){
            console.log("User is not logedIn");
            return 0;
        }
        console.log("User is logedIn");
        const minuteNow = (Date.now() % (1000 * 60 * 60 * 24)) / 1000 / 60;
        const hours = Math.floor(minuteNow / 60) + 1;
        const minutes = Math.floor(minuteNow % 60);
        chatNS.emit("message", {
            user:req.session.username,
            time:`${hours}:${minutes}`,
            message:message
        });
    });
});

httpServer.listen(8080, ()=>{console.log("Server started on port 8080")});