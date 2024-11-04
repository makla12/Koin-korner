import express from "express";
import session from 'express-session';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import { logIn, register } from "./src/mysql.mjs";
import nodemailer from "nodemailer";


//Ustawienia sesji i CORS
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


//Stworzenie aplikacji za pomocącą express oraz dodanie opcji
const app = express();
app.use(express.json());
app.use(sessionMiddleware);
app.use(cors(corsOptions));


//Zdefiniowanie routów związanych autoryzacji
app.get("/auth/checkLogIn", (req, res) => { //Odsyła czy użytkownik jest zalogowany oraz nazwę użytkownika
    res.json({
        isLogedIn:(req.session.isLogedIn == undefined ? false : req.session.isLogedIn),
        username:req.session.username
    });
});

app.post("/auth/logIn",async (req, res)=>{ //Próba zalogowania użytkownika
    if(req.body.username == undefined || req.body.password == undefined){ //Sprawdzienie czy request użytkownika posiada dane
        return 0;
    }
    let loginRes = await logIn(req.body.username, req.body.password); //Weryfikacja danych podanych przez użytkownika
    req.session.isLogedIn = loginRes == 0;
    req.session.username = req.body.username;
    res.json({suc:loginRes == 0}); //Odpowiedz serwera do użytkownika o tym czy logowanie się powiodło
});

app.post("/auth/logOut", (req, res)=>{ //Wylogowanie użytkownika
    req.session.isLogedIn = false;
    res.json({suc:true});
});

app.post("/auth/register", async (req, res) => {
    if(req.body.email == undefined || req.body.username == undefined || req.body.password == undefined){ //Sprawdzienie czy request użytkownika posiada dane
        return 0;
    }
    let registerRes = await register(req.body.email, req.body.username, req.body.password); //Weryfikacja danych podanych przez użytkownika
    if(registerRes == 0){
        req.session.isLogedIn = registerRes == 0;
        req.session.username = req.body.username;
    }
    res.json({suc:registerRes == 0}); //Odpowiedz serwera do użytkownika o tym czy logowanie się powiodło
});

//Zdefiniowanie routów związanych z aplikacją

/*	WIP		Dodanie odczytu danych z bazy danych*/

app.get("/app/chatHistory", (req, res) => { //Odsyła ostatnie 50 wiadomości z cztu
    res.json({messages:[
        {user:"makla", time:"13:46", message:"Rudy to cwel"},
        {user:"rudy", time:"13:47", message:"To prawda"}
    ]});
});





//Stworzenie serwera HTTP
const httpServer = createServer(app);





//Stworzenie serwera socket.io oraz doadnie ustawień
const io = new Server(httpServer, {
    cors:corsOptions
});
io.engine.use(sessionMiddleware);


//Stworzenie przestrzeni nazw dla czatu
const chatNS = io.of("/chatNS")

//Zajęcie się połączeniem z czatu
chatNS.on("connection", (socket) => {
    const req = socket.request;
    console.log("conected");

	//Odświerzanie sesji przy każdej wiadomości
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
    
	//Reakcja serwera przy rozłączeniu użytkownika
    socket.on("disconnecting", () => {
        console.log("dc");
    });

	//Reakcja i odpowiedz serwera na wysłanie wiadomości

	/*	WIP		Dodanie zapisu do bazy danych*/

    socket.on("sendMessage", (message) => {
        if(!req.session.isLogedIn){ //Sprawdzenie czy użytkownik jest zalogowany
            return ;
        }
		//Zdobycie teraźniejszej godziny
        const minuteNow = (Date.now() % (1000 * 60 * 60 * 24)) / 1000 / 60;
        const hours = Math.floor(minuteNow / 60) + 1;
        const minutes = Math.floor(minuteNow % 60);

		//Wysłanie wiadomości do użytkowników
        chatNS.emit("message", {
            user:req.session.username,
            time:`${hours}:${minutes}`,
            message:message
        });
    });
});

httpServer.listen(8080, ()=>{console.log("Server started on port 8080")});