import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config({path:"./../env"});

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

export default db;