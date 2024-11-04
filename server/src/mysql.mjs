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
			return 1;
		}
		if(rows[0].pass != crypto.createHash("sha256").update(password).digest("hex")){ //Sprawdzenie czy hasło zgadza się z podanym
			return 1;	
		}
		return 0; //Zwrócenie 0 jeżeli logowanie się powiodło
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
			await conn.query("INSERT INTO users VALUE(null, ?, ?, 5, ?)", [username, crypto.createHash("sha256").update(password).digest("hex"), email]); //Dodanie użytkownika do bazy danych
			return 0;
		}
		catch (e){
			return 1;
		}
	}
	finally{
		if(conn) conn.release();
	}
}

export { logIn, register };