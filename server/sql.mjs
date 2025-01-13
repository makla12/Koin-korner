import mariadb from 'mariadb';
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

const pool = mariadb.createPool({host:process.env.DB_HOST, user:process.env.DB_USER, password:process.env.DB_PASSWORD, database:process.env.DB_DATABASE});

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

const checkUsernameAndEmail = async (username, email) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM users WHERE username  = ? OR email = ?", [username, email]);
		if(rows.length == 0){
			return true;
		}
		return false;
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
			const res = await conn.query("INSERT INTO users VALUE(null, ?, ?, 1000, ?)", [username, crypto.createHash("sha256").update(password).digest("hex"), email]); //Dodanie użytkownika do bazy danych
			return Number(res.insertId);
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

const getBalance = async (userId) => {
	let conn;
	try{
		conn = await pool.getConnection();
		let res = await conn.query("SELECT balance FROM users where id = ?;", [userId]);
		if(res.length != 1) return 0;

		return res[0].balance;
	}
	finally{
		if(conn) conn.release();
	}
}

const saveBet = async (userId, gameId, bet, mult) => {
	let conn;
	try{
		conn = await pool.getConnection();
		try{
			await conn.query("INSERT INTO bets VALUE(null, ?, ?, ?, ?);", [userId, gameId, bet, mult]);
			conn.query("UPDATE users SET balance = balance - ? + ? WHERE id = ?;", [bet, bet * mult, userId])
			return;
		}
		catch(err){
			console.log(err);
			return;
		}
	}
	finally{
		if(conn) conn.release();
	}
}

const getServerSeed = async () => {
	let conn;
	try{
		conn = await pool.getConnection();
        const datenow = new Date(Date.now()); 
        const year = datenow.getFullYear();
        const month = datenow.getMonth() + 1;
        const day = datenow.getDate();
        const dateSting = `${year}-${month < 10 ? "0" : ""}${month}-${day}`;
		let seed = await conn.query("SELECT id, seed FROM server_seed WHERE date = ?",[dateSting]);
		if(seed.length == 0){
			let chars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
			let seedGen = "";
			for(let i = 0; i < 64; i++){
				seedGen += chars[Math.floor(Math.random() * 15)];
			}
			let seedHash = crypto.createHash("sha256").update(seedGen).digest("hex");
			const res = await conn.query("INSERT INTO server_seed VALUE(null,?,?,?)",[seedGen, seedHash, dateSting]);
			return [Number(res.insertId), seedGen];
		}
		return [seed[0].id, seed[0].seed];
	}
	finally{
		if(conn) conn.release();
	}
}

const getPublicSeed = async (gameType) => {
	let conn;
	try{
		conn = await pool.getConnection();
        const datenow = new Date(Date.now()); 
        const year = datenow.getFullYear();
        const month = datenow.getMonth() + 1;
        const day = datenow.getDate();
        const dateSting = `${year}-${month < 10 ? "0" : ""}${month}-${day}`;
		const seed = await conn.query("SELECT id, seed FROM public_seed WHERE date = ? AND game_type = ?",[dateSting, gameType]);
		if(seed.length == 0){
			let seedGen = "";
			for(let i = 0; i < 16; i++){
				seedGen += Math.floor(Math.random() * 9);
			}
			const res = await conn.query("INSERT INTO public_seed VALUE(null,?,?,?)",[seedGen, dateSting, gameType]);
			return [Number(res.insertId), seedGen];
		}
		return [seed[0].id, seed[0].seed];
	}
	finally{
		if(conn) conn.release();
	}
}

const getGameRound = async (gameType) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const round = await conn.query("SELECT MAX(round) as round FROM games INNER JOIN public_seed ON public_seed_id = public_seed.id WHERE game_type = ?;",[gameType]);
		if(round[0].round == null) return 0;
		
		return round[0].round + 1;
	}
	finally{
		if(conn) conn.release();
	}
}

const saveGameRound = async (round, score, serverSeedId, publicSeedId) => {
	let conn;
	try{
		conn = await pool.getConnection();
		const res = await conn.query("INSERT INTO games VALUES(null, ?, ?, ?, ?)", [round, score, serverSeedId, publicSeedId]);
		return res.insertId;
	}
	finally{
		if(conn) conn.release();
	}
}

const getLast10RouletteRolls = async () => {
	let conn;
	try{
		conn = await pool.getConnection();
		const last10Rolls = await conn.query("SELECT score from games ORDER BY round DESC LIMIT 10;");
		return last10Rolls;
	}
	finally{
		if(conn) conn.release();
	}
}

export { checkUsernameAndEmail, logIn, register, saveMessage, getMessages, getServerSeed, getPublicSeed, getGameRound, saveGameRound, getLast10RouletteRolls, getBalance, saveBet};