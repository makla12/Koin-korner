import cors from 'cors';
import express from "express";
import { logIn, register, getMessages, getServerSeed, getPublicSeed, checkUsernameAndEmail } from "./sql.mjs";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const createExpressApp = (corsOptions, sessionMiddleware, dev) => {
    const app = express();
    app.use(express.json());
    app.use(sessionMiddleware);
    app.use(cors(corsOptions));


    //Zdefiniowanie routów związanych autoryzacji
    app.get("/auth/checkLogIn", (req, res) => { //Odsyła czy użytkownik jest zalogowany oraz nazwę użytkownika
        res.json({
            isLoggedIn:(req.session.isLoggedIn == undefined ? false : req.session.isLoggedIn),
            username:req.session.username
        });
    });

    app.post("/auth/logIn",async (req, res)=>{ //Próba zalogowania użytkownika
        if(req.body.username == undefined || req.body.password == undefined){ //Sprawdzienie czy request użytkownika posiada dane
            return 0;
        }
        const id = await logIn(req.body.username, req.body.password); //Weryfikacja danych podanych przez użytkownika
        req.session.isLoggedIn = id != 0;
        req.session.userId = id;
        req.session.username = req.body.username;
        res.json({suc:id != null}); //Odpowiedz serwera do użytkownika o tym czy logowanie się powiodło
    });

    app.post("/auth/logOut", (req, res)=>{ //Wylogowanie użytkownika
        req.session.isLoggedIn = false;
        res.json({suc:true});
    });

    //Rejestracja użytkownika
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const generateCode = () => {
        let code = "";
        for(let i = 0; i < 4; i++){
            code += Math.floor(Math.random() * 10).toString();
        }
        return code;
    }

    const sendVerifyEmail = (email) => {
        let code = generateCode();
        if(dev) code = "0000";
        const mailOptions = {
            to: email,
            subject: "Kod weryfikacyjny do Koin Korner",
            text: `Twój kod weryfikacyjny to ${code}`,
        };
        if(!dev){
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email: ", error);
                }
                else {
                    console.log("Email sent: ", info.response);
                }
            });
        }
        return code;
    };

    app.post("/auth/register", async (req, res) => {
        if(req.body.email == undefined || req.body.username == undefined || req.body.password == undefined){ //Sprawdzienie czy request użytkownika posiada dane
            res.json({suc:false})
            return 0;
        }
        req.session.regUsername = req.body.username;
        req.session.regEmail = req.body.email;
        req.session.regPassword = req.body.password;

        const canLogin = await checkUsernameAndEmail(req.body.username, req.body.email);
        if(canLogin){
            const code = sendVerifyEmail(req.body.email);
            req.session.code = code;
        }
        res.json({suc:canLogin});
    });

    app.post("/auth/registerConfirm", async (req, res) => {
        if(req.body.code == undefined){ //Sprawdzienie czy request użytkownika posiada dane
            res.json({suc:false});
            return 0;
        }
        if(req.body.code != req.session.code){
            res.json({suc:false});
            return 0;
        }
        const registerId = Number(await register(req.session.regEmail, req.session.regUsername, req.session.regPassword));
        console.log(registerId);
        req.session.isLoggedIn = registerId != 0;
        req.session.userId = registerId;
        if(registerId != 0) req.session.username = req.session.regUsername;
        res.json({suc:registerId != 0});
    });

    //Zdefiniowanie routów związanych z aplikacją
    app.get("/app/chatHistory",async (req, res) => { //Odsyła ostatnie 50 wiadomości z cztu
        res.json({messages:await getMessages()});
    });

    return app;
}

export default createExpressApp;