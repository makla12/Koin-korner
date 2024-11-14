import mariadb from 'mariadb';
import crypto from "crypto";
// import dotenv from 'dotenv';
// dotenv.config({path:"./../env"});

const pool = mariadb.createPool({host: "localhost", user: "root", password: "", database: "kk"});

//Funkcja próbująca zalogować urzytkownika, jeżeli użytkownik nie istniej tworzy konto z podanym hasłem
const logIn = async (username, password) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM users WHERE username  = ?", [username]);
		if(rows.length == 0){ //Sprawdzenie czy nie istnieje użytkownik
			return null;
		}
		if(rows[0].pass != crypto.createHash("sha256").update(password).digest("hex")){ //Sprawdzenie czy hasło zgadza się z podanym
			return null;	
		}
		return rows[0].id; //Zwrócenie 0 jeżeli logowanie się powiodło
	}
	finally{
		if(conn) conn.release();
	}
}

//Funkcaj rejestrująca użytkownika
const register = async (email, username, password) => {
	let conn;
	try{
		conn = await pool.getConnection();
		try{
			const res = await conn.query("INSERT INTO users VALUE(null, ?, ?, 5, ?)", [username, crypto.createHash("sha256").update(password).digest("hex"), email]); //Dodanie użytkownika do bazy danych
			return res.insertId;
		}
		catch (e){
			return null;
		}
	}
	finally{
		if(conn) conn.release();
	}
}

const saveMessage = async (userid, date, message) => {
	let conn;
	try{
		conn = await pool.getConnection();
		await conn.query("INSERT INTO chat VALUE(null, ?, ?, ?)", [userid.toString(), date, message]);
	}
	finally{
		if(conn) conn.release();
	}
}

const getMessages = async () => {
	let conn;
	try{
		conn = await pool.getConnection();
		let res = await conn.query("SELECT username, date, message FROM chat INNER JOIN users ON chat.user_id = users.id ORDER BY date ASC LIMIT 50;");
		return res;
	}
	finally{
		if(conn) conn.release();
	}
}
export { logIn, register, saveMessage, getMessages };