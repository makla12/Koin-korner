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
			const res = await conn.query("INSERT INTO users VALUE(null, ?, ?, 5)", [username, password]);
			console.log(res);
			return 0;
		}
		console.log(rows);
	}
	finally{
		if(conn) conn.release();
	}
}

export {LogIn};