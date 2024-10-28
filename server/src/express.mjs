import express from "express";
import cors from 'cors';
import session from 'express-session';
import {LogIn} from "./mysql.mjs";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(cors({
    origin:"*",
    methods: ['POST', 'GET'],
    credentials: true
}));

app.get("/auth/checkLogIn", (req, res) => {
    res.json({
        isLogedIn:(req.session.isLogedIn == undefined ? false : req.session.isLogedIn),
        username:req.session.username
    });
});

app.post("/auth/logIn",async (req, res)=>{
    let loginRes = await LogIn(req.body.username, req.body.password);
    req.session.isLogedIn = loginRes == 0;
    req.session.username = req.body.username;
    res.json({suc:loginRes == 0});
});

app.post("/auth/logOut", (req, res)=>{
    req.session.isLogedIn = false;
    res.json({suc:true});
});

export default app;
