import express from "express";
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(cors({
    origin:"http://localhost:5173",
    methods: ['POST', 'GET'],
    credentials: true
}));

app.get("/auth/logedIn", (req, res) => {
    console.log(req.session)
    console.log(req.session.isLogedIn);
    console.log(req.session.username);
    res.json({
        isLogedIn:"a",
        username:"a"
    });
});

app.get("/auth/logIn", (req, res)=>{
    console.log(1);
    req.session.isLogedIn = true;
    req.session.username = "makla";
    console.log(req.session);
    res.json({suc:true});
});


export default app;
