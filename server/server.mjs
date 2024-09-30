import dotenv from 'dotenv';
dotenv.config({path:"./.env"});

import mysql from 'mysql'
//Create server
import io from './src/socket.mjs';

//Create db connection
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});
db.connect((err)=>{
	if(err){
		console.log(err);
	}
	else{
		console.log("Connected to database");
	}
});

