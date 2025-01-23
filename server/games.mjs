import  crypto  from "crypto";

function generateHash(seed) {
	return crypto
		.createHash("sha256")
		.update(seed)
		.digest("hex");
}

//Roulette
function rollFromSeed(serverSeed, publicSeed, round){
	let hash = crypto.createHash("sha256").update(serverSeed).update(publicSeed).update(round).digest("hex");
	let roll = Number("0x" + hash.substring(0,8)) % 15;
	return roll;
}

//Crash
function divisible(hash, mod) {
	var val = 0;
	var o = hash.length % 4;
	for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
		val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
	}

	return val === 0;
}

function crashPointFromHash(serverSeed, publicSeed, round) {
	const hash = crypto
		.createHmac("sha256", serverSeed)
		.update(publicSeed)
		.update(round)
		.digest("hex");

	const hs = parseInt(100 / 3);
	if (divisible(hash, hs)) {
		return 1;
	}

	const h = parseInt(hash.slice(0, 52 / 4), 16);
	const e = Math.pow(2, 52);

	return Math.floor((100 * e - h) / (e - h)) / 100.0;
}

function crashPointToTime(crashPoint) {
	return 10 * Math.log(crashPoint);
}

function crashPointFromTime(crashTime) {
	if(crashTime < 0) return 1;
	return Math.pow(Math.E, 0.1 * crashTime);
}

export { crashPointFromHash, crashPointToTime, crashPointFromTime, rollFromSeed };