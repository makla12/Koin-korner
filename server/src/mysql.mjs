import mariadb from 'mariadb';
// import dotenv from 'dotenv';
// dotenv.config({path:"./../env"});

const pool = mariadb.createPool({host: "localhost", user: "root", password: "", database: "kk"});

//Funkcja próbująca zalogować urzytkownika, jeżeli użytkownik nie istniej tworzy konto z podanym hasłem
const LogIn = async (username, password) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM users WHERE username  = ?", [username]);
		if(rows.length == 0){ //Sprawdzenie czy nie istnieje użytkownik
			await conn.query("INSERT INTO users VALUE(null, ?, ?, 5)", [username, password]); //Dodanie użytkownika do bazy danych
			return 0;
		}
		if(rows[0].pass == password){ //Sprawdzenie czy hasło zgadza się z podanym
			return 0;	
		}
		return 1; //Zwrócenie 1 jeżeli logowanie się nie powiodło
	}
	finally{
		if(conn) conn.release();
	}
}

export {LogIn};