import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config({path:"./../env"});

const pool = mariadb.createPool({host: "localhost", user: "root", password: "", database: "kk"});

const LogIn = async (username, password) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM users WHERE username  = ?", [username]);
		if(rows.length == 0){
			await conn.query("INSERT INTO users VALUE(null, ?, ?, 5)", [username, password]);
			return 0;
		}
		if(rows[0].pass == password){
			return 0;	
		}
		return 1;
	}
	finally{
		if(conn) conn.release();
	}
}

export {LogIn};