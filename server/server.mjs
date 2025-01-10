import createExpressApp from './experssApp.mjs';
import createSocketIOServer from './socketIOServer.mjs';
import session from 'express-session';

import { createServer } from "http";
import dotenv from 'dotenv';
dotenv.config();

const dev = true;
//Ustawienia sesji i CORS
const sessionMiddleware = session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
});

const corsOptions = {
    origin: ["http://localhost:3000", "http://192.168.88.10:3000"],
    methods: ['POST', 'GET'],
    credentials: true
};

//Stworzenie aplikacji express js
const app = createExpressApp(corsOptions, sessionMiddleware, dev);

//Stworzenie serwera HTTP
const httpServer = createServer(app);

//Stworzenie serwera socket.io
createSocketIOServer(httpServer, corsOptions, sessionMiddleware);

httpServer.listen(8080, ()=>{console.log("Server started on port 8080")});