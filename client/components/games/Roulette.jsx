import Image from "next/image";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import blankProfile from "@/public/blank_profile.png";
import { RouletteBetOption } from "../elements/RouletteBetOption";
import { RouletteBet } from "../elements/RouletteBet";

function Roulette({ isLogedIn, username, updateBalance, balance }) {
	const rouletteRef = useRef(null);
	const inputRef = useRef(null);
	const timeLeft = useRef(0);
	const timerRef = useRef(null);
	
	const [rouletteSocket, setRouletteSocket] = useState(null);
	const [playTimer, setPlayTimer] = useState(false);
	const [rollHistory, setRollHistory] = useState([]);
	const [allBets, setAllBets] = useState([]);
	const [AlertInfo, setAlertInfo] = useState([]);

	const betsSorted = allBets.sort((a,b) => (a.bet < b.bet ? 1 : (a.bet > b.bet ? -1 : 0)));

	const bets = betsSorted.filter((item) => item.name != username);
	const selfBets = betsSorted.filter((item) => item.name == username);

	const getSelfBetsNums = () => {
		let arr = [];
		selfBets.forEach(value => {
			arr.push(value.choice);
		})
		return arr;
	}
	const selfBetsNums = getSelfBetsNums();

	const getBetsSum = (filterType) => {
		let filterArr = allBets.filter(filterType);
		let sum = 0;
		filterArr.forEach((item)=>{sum += item.bet});
		return sum;
	}

	const filterRed = (item) => {
		const choice = item.choice;
		const numChoice = Number(choice);

		if(!isNaN(numChoice)) return numChoice < 8;

		if(choice == "RED") return true;

		return false;
	}

	const filterYellow = (item) => {
		const choice = item.choice;
		const numChoice = Number(choice);

		if(!isNaN(numChoice)) return false;

		if(choice == "K" || choice == "EVEN" || choice == "ODD") return true;

		return false;
	}

	const filterBlack = (item) => {
		const choice = item.choice;
		const numChoice = Number(choice);

		if(!isNaN(numChoice)) return numChoice > 7;

		if(choice == "BLACK") return true;

		return false;
	}

	const sumBet = (type) => {
		const filterArr = selfBets.filter((type == 0 ? filterRed : (type == 1 ? filterYellow : filterBlack)))
	}

	useEffect(()=>{
//Fectch
		setRouletteSocket(io(window.location.hostname + ":8080/rouletteNS", {withCredentials: true}));

// Crerate interval form timer
		const timeInterval = setInterval(()=>{
            if(timeLeft <= 0) 
			{
				timeLeft = 0;
				return;
			}

			timeLeft.current = timeLeft.current - 1;

			if(timerRef.current) timerRef.current.innerHTML = `${(timeLeft.current/10).toFixed(1)}`;
        },100);

		return () => {
			clearInterval(timeInterval);
		}
	},[]);

	useEffect(()=>{
		if(!rouletteSocket) return;

		rouletteSocket.on("initialParams",(time, bets, last10Rolls) => {
			console.log(bets);
			setAllBets(bets);
			setRollHistory(last10Rolls);
			const timerTime = 150 + 30 + 10 - (Date.now() - time) / 100;
			setPlayTimer(true);
			timeLeft.current = timerTime;
		});

		rouletteSocket.on("confirmBet", ()=>{
			updateBalance();
		});

		rouletteSocket.on("roll", (score) => {
			roll(score);
		});
	},[rouletteSocket]);

	useEffect(()=>{
		if(!rouletteSocket) return;

		rouletteSocket.on("addBet",(betObj) => {
			let arr = Array.from(allBets);
			arr.push(betObj);
			setAllBets(arr);
		});

		return ()=>{
			rouletteSocket.off("addBet");
		}
	},[rouletteSocket, allBets])

	const bet = (choice) => {
		if(!inputRef || !rouletteSocket) return;

		rouletteSocket.emit("bet", choice, Number(inputRef.current.value));
	}

	const roll = (x) => {
		setPlayTimer(false);
		changeRoulettePosition(x);
		timeLeft.current = 150 + 30 + 10;
		setTimeout(() => {
			updateBalance();
			setAllBets([]);
			setRollHistory(prev => [{score:x}].concat(prev.slice(0,-1)));
			reset();
			setPlayTimer(true);	
		}, 3000 + 1000);
	}

	const reset = () => {
		if(!rouletteRef.current) return;
		rouletteRef.current.style.transform = `translateX(0)`;
	}

	function changeRoulettePosition(number) {
		if (!rouletteRef.current) return;

		let steps = 5 * 15 * 9 + Math.random() * 4 - 2 - 1.3;
		switch(number){
			case 1:
				steps += 5 * -6;
				break;

			case 2:
				steps += 5 * -4;
				break;

			case 3:
				steps += 5 * -2;
				break;

			case 4:
				steps += 5 * 0;
				break;

			case 5:
				steps += 5 * 2;
				break;

			case 6:
				steps += 5 * 4;
				break;

			case 7:
				steps += 5 * 6;
				break;

			case 8:
				steps += 5 * -5;
				break;

			case 9:
				steps += 5 * -3;
				break;

			case 10:
				steps += 5 * -1;
				break;

			case 11:
				steps += 5 * 1;
				break;

			case 12:
				steps += 5 * 3;
				break;

			case 13:
				steps += 5 * 5;
				break;

			case 14:
				steps += 5 * 7;
				break;

			case 0:
				steps += 5 * -7;
				break;

			default:
				steps = 0;
		}
		rouletteRef.current.style.transform = `translateX(-${steps}vw)`;
	}

	function changeInput(action) {
		if (!inputRef.current) return;

		switch (action) {
			case "0":
				inputRef.current.value = 0;
				betRound();
				break;
			case "+10":
				inputRef.current.value = Number(inputRef.current.value) + 10;
				betRound();
				break;
			case "+100":
				inputRef.current.value = Number(inputRef.current.value) + 100;
				betRound();
				break;
			case "+1000":
				inputRef.current.value = Number(inputRef.current.value) + 1000;
				betRound();
				break;
			case "1/2":
				inputRef.current.value = Number(inputRef.current.value) / 2;
				betRound();
				break;
			case "x2":
				inputRef.current.value = Number(inputRef.current.value) * 2;
				betRound();
				break;
			case "MAX":
				inputRef.current.value = balance;
				betRound();
				break;
		}
	}

	function betRound() {
		inputRef.current.value = Math.floor(Number(inputRef.current.value));
	}

	function showAlert(positive, mess) {
		setAlertInfo([...AlertInfo, {isPositive: positive, message: mess}]);
	}

  	return (
    <>
		{
			AlertInfo.map((obj, index) => (
				<Alert key={index} isPositive={obj.isPositive} message={obj.message}/>
			))
		}
	<div id="container" className="w-full relative">

{/* Roulette */}
        <div ref={timerRef} className={`w-full bg-[#27272acf] aspect-[130/12] absolute z-10 flex justify-center items-center text-3xl select-none ${(!playTimer ? "hidden" : "")}`}></div>

		<div className="h-[2vh] w-[0.2vw] bg-white m-auto flex justify-center"></div>
		<div  id="roulette" ref={rouletteRef} className={`flex justify-start items-center rounded-lg w-full relative transition-transform duration-[3s]`}>
			{
				[
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
					{color: "yellow", number: "K"},
					{color: "red", number: "1"},
					{color: "black", number: "8"},
					{color: "red", number: "2"},
					{color: "black", number: "9"},
					{color: "red", number: "3"},
					{color: "black", number: "10"},
					{color: "red", number: "4"},
					{color: "black", number: "11"},
					{color: "red", number: "5"},
					{color: "black", number: "12"},
					{color: "red", number: "6"},
					{color: "black", number: "13"},
					{color: "red", number: "7"},
					{color: "black", number: "14"},
				].map((div, index) => (
					<div key={index} className={`
						w-[5vw] aspect-square
						${div.color == "yellow" ? "bg-yellow-500" : div.color == "red" ? "bg-red-500" : "bg-black"} 
						text-3xl text-"[#e6e6e6]" font-bold
						flex flex-shrink-0 justify-center items-center select-none text-[2vw]`}
					>{div.number}</div>
				))
			}
		</div>
		<div className="h-[2vh] w-[0.2vw] bg-white m-auto flex justify-center"></div>
	</div>

{/* Roulette history */}
	<div id="rouletteHistory" className="w-2/3 h-5% flex flex-row-reverse justify-end gap-[1%] my-[0.1%]">
		{
			rollHistory.map((value, index) => {
				const score = Number(value.score).toFixed(0);
				const type = (score == 0 ? 1 : (score < 8 ? 0 : 2));

				return (
					<div key={index} className={`
						w-[4%] aspect-square
						${type == 1 ? "bg-yellow-500" : type == 0 ? "bg-red-500" : "bg-black"} 
						text-[1vw] "text-[#e6e6e6] p-[0.1%] text-xl
						rounded-full flex flex-shrink-0 justify-center items-center select-none`}
					>{(score == 0 ? "K" : score)}</div>
				)
			})
		}
	</div>
	
{/* Roulette bet input */}
	<div className="w-full h-1/10 flex justify-center items-center">
		<form action="" className="w-full flex justify-center items-center">
			<input type="number" name="bet" id="bet" ref={inputRef} placeholder="Zakład" className="
				w-1/2 h-full rounded-lg p-[0.8%] bg-[#525864] select-none text-[1vw]"
			/>
			{
				[
					{text: "0"},
					{text: "+10"},
					{text: "+100"},
					{text: "+1000"},
					{text: "1/2"},
					{text: "x2"},
					{text: "MAX"},
				].map((div, index) => (
					<div key={index} className={`
						w-[6%] h-full select-none flex justify-center items-center text-[1vw] ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#525864]"}
						m-[0.5%] p-[0.6%] rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#454952]"}`} 
						onClick={()=>{ changeInput(div.text) }}
					>
						{div.text}
					</div>
				))
			}
		</form>
	</div>

{/* Bet tables */}
	<div className="w-full h-2/3 flex justify-around p-[1%]">

{/* Reds */}
		<div className="w-[30%] flex flex-col gap-[1vh]"> {/* Bets */}
			<div className="w-full h-[15%] p-[1%] flex justify-evenly items-center bg-[#525864] rounded-xl">
				{
					[
						{text:"CZERWONE", value:"RED"},
						{text: "1", value:"1"},
						{text: "2", value:"2"},
						{text: "3", value:"3"},
						{text: "4", value:"4"},
						{text: "5", value:"5"},
						{text: "6", value:"6"},
						{text: "7", value:"7"},
					].map((div, index) => (
						<RouletteBetOption clicked={bet} key={index} text={div.text} value={div.value} disabled={!playTimer || selfBetsNums.includes(div.value) } className={`${(!playTimer || selfBetsNums.includes(div.value) ? "bg-[#525252] opacity-50" : "bg-red-600 hover:bg-red-700")} border-red-800 px-[2%]`}/>
					))
				}
			</div>

{/* All bets */}
			<div className="w-full h-[85%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p className="font-bold">{allBets.filter(filterRed).length}</p>
					</div>
					<div>
						<p className="font-bold">Łączny zakład: {getBetsSum(filterRed)}</p>
					</div>
				</div>
				<hr/>
				{selfBets.filter(filterRed).map((item, index)=>(
					<RouletteBet key={index} {...item} type={0} self />
				))}

				{bets.filter(filterRed).map((item, index)=>(
					<RouletteBet key={index} {...item} type={0} />
				))}
			</div>
		</div>

{/* Yellow, odd and even */}
		<div className="w-[30%] flex flex-col gap-[1vh]"> {/* Bets */}
			<div className="w-full h-[15%] flex justify-between items-center p-[1%] bg-[#525864] rounded-xl">
				<RouletteBetOption clicked={bet} text={"PARZYSTE"} value={"EVEN"} disabled={!playTimer|| selfBetsNums.includes("EVEN") } className={`${(!playTimer || selfBetsNums.includes("EVEN") ? "bg-[#525252] opacity-50" : "bg-yellow-600 hover:bg-yellow-700")} border-yellow-800 px-[2%]`}/>
				<RouletteBetOption clicked={bet} text={"K"} value={"K"} disabled={!playTimer|| selfBetsNums.includes("K") } className={`${(!playTimer || selfBetsNums.includes("K") ? "bg-[#525252] opacity-50" : "bg-yellow-600 hover:bg-yellow-700")} border-yellow-800 px-[13%]`}/>
				<RouletteBetOption clicked={bet} text={"NIEPARZYSTE"} value={"ODD"} disabled={!playTimer|| selfBetsNums.includes("ODD") } className={`${(!playTimer || selfBetsNums.includes("ODD") ? "bg-[#525252] opacity-50" : "bg-yellow-600 hover:bg-yellow-700")} border-yellow-800 px-[2%]`}/>
			</div>
				
{/* All bets */}
			<div className="w-full h-[85%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p className="font-bold">{allBets.filter(filterYellow).length}</p>
					</div>
					<div>
						<p className="font-bold">Łączny zakład: {getBetsSum(filterYellow)}</p>
					</div>
				</div>
				<hr/>

				{selfBets.filter(filterYellow).map((item, index)=>(
					<RouletteBet key={index} {...item} type={1} self />
				))}

				{bets.filter(filterYellow).map((item, index)=>(
					<RouletteBet key={index} {...item} type={1} />
				))}
			</div>
		</div>

{/* Black */}
		<div className="w-[30%] flex flex-col gap-[1vh]"> {/* Bets */}
			<div className="w-full h-[15%] p-[1%] flex justify-between items-center bg-[#525864] rounded-xl">
				{
						[
							{text: "CZARNE", value:"BLACK"},
							{text: "8", value:"8"},
							{text: "9", value:"9"},
							{text: "10", value:"10"},
							{text: "11", value:"11"},
							{text: "12", value:"12"},
							{text: "13", value:"13"},
							{text: "14", value:"14"},
						].map((div, index) => (
							<RouletteBetOption clicked={bet} key={index} text={div.text} value={div.value} disabled={!playTimer|| selfBetsNums.includes(div.value) } className={`${(!playTimer || selfBetsNums.includes(div.value) ? "bg-[#525252] opacity-50" : "bg-gray-900 hover:bg-gray-800")} border-gray-950 px-[2%]`}/>
						))
				}
			</div>

{/* All bets */}
			<div className="w-full h-[85%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p className="font-bold">{allBets.filter(filterBlack).length}</p>
					</div>
					<div>
						<p className="font-bold">Łączny zakład: {getBetsSum(filterBlack)}</p>
					</div>
				</div>
				<hr/>

				{selfBets.filter(filterBlack).map((item, index)=>(
					<RouletteBet key={index} {...item} type={2} self />
				))}

				{bets.filter(filterBlack).map((item, index)=>(
					<RouletteBet key={index} {...item} type={2} />
				))}
			</div>
		</div>
	</div>
	</>
  	)
}

export {Roulette};