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
    origin:"http://localhost:3000",
    methods: ['POST', 'GET'],
    credentials: true
}));

app.get("/auth/CheckLogIn", (req, res) => {
    console.log(req.session)
    console.log(req.session.isLogedIn);
    console.log(req.session.username);
    res.json({
        isLogedIn:"a",
        username:"a"
    });
});

app.post("/auth/logIn", (req, res)=>{
    console.log(req.body);
    LogIn(req.body.username, req.body.password);
    res.json({suc:true});
});


export default app;
