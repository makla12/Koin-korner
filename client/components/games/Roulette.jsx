import Image from "next/image";
import {useEffect, useRef} from "react";
import blankProfile from "@/public/blank_profile.png";

function Roulette() {
	const rouletteRef = useRef(null);
	const inputRef = useRef(null);
	const chosenBet = null;
	useEffect(()=>{
		setTimeout(() => {bet(13)}, 500);
	},[]);
	function bet(number) {
		if (rouletteRef.current) {
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
	}

	function changeInput(action) {
		if (inputRef.current) {
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
	}

	function betRound() {
		inputRef.current.value = Math.floor(Number(inputRef.current.value));
	}

  	return (
    <>

	<div id="container" className="">

{/* Roulette */}
		<div className="h-[2vh] w-[0.2vw] bg-white m-auto flex justify-center"></div>
		<div  id="roulette" ref={rouletteRef} className="h-[20%] flex justify-start items-center rounded-lg w-full relative transition-transform duration-[5s]">
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
						text-3xl text-${div.number === "K" ? "[#181818]" : "[#e6e6e6]"} font-bold
						flex flex-shrink-0 justify-center items-center select-none text-[2vw]`}
					>{div.number}</div>
				))
			}
		</div>
		<div className="h-[2vh] w-[0.2vw] bg-white m-auto flex justify-center"></div>
	</div>

{/* Roulette history */}
	<div id="rouletteHistory" className="w-2/3 h-5% flex gap-[1%] my-[0.1%]">
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
				{color: "red", number: "5"}
			].map((div, index) => (
				<div key={index} className={`
					w-[4%] aspect-square
					${div.color == "yellow" ? "bg-yellow-500" : div.color == "red" ? "bg-red-500" : "bg-black"} 
					text-[1vw] ${div.number === "K" ? "text-[#181818] font-bold" : "text-[#e6e6e6]"} p-[0.1%] text-xl
					rounded-full flex flex-shrink-0 justify-center items-center select-none`}
				>{div.number}</div>
			))
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
	<div className="w-full h-1/2 flex justify-around p-[1%]">

{/* Reds */}
		<div className="w-[30%] flex flex-col"> {/* Bets */}
			<div className="w-full h-1/5 p-[1%] flex justify-between items-center bg-[#525864] rounded-xl">
				<div className="w-1/3 h-full px-[1%] py-[2%] bg-red-600 flex justify-center items-center text-[0.8vw] rounded-xl select-none">CZERWONE</div>
				<div className="w-2/3 h-full flex justify-around items-center">
				{
						[
							{text: 1},
							{text: 2},
							{text: 3},
							{text: 4},
							{text: 5},
							{text: 6},
							{text: 7},
						].map((div, index) => (
							<div key={index} className="w-[12%] h-full px-[1%] bg-red-600 flex justify-center items-center text-[1vw] rounded-xl select-none">
								{div.text}
							</div>
						))
				}
				</div>
			</div>

{/* Yout bet */}
			<div className="w-full h-[15%] flex justify-center items-center p-[2%] bg-[#525864] rounded-xl my-[1%]">
				<p className="text-center text-[1vw]">100</p>
			</div>

{/* All bets */}
			<div className="w-full h-[65%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p>1</p>
					</div>
					<div>
						<p>Łączny zakład: 100</p>
					</div>
				</div>
				<hr/>
				<div className="flex justify-between items-center h-10">
					<p>Rudy</p>
					<div className="flex items-center gap-1">
						<p className="font-bold text-lg">100</p>
						<div className="w-4 h-8 bg-red-600 flex justify-center items-center rounded-lg">7</div>
					</div>
				</div>
			</div>
		</div>

{/* Yellow, odd and even */}
		<div className="w-[30%] flex flex-col"> {/* Bets */}
			<div className="w-full h-1/5 flex justify-between items-center p-[1%] bg-[#525864] rounded-xl">
				<div className="w-[30%] h-full m-[1%] px-[1%] py-[2%] bg-amber-500 flex justify-center items-center text-[0.9vw] rounded-xl select-none">PARZYSTE</div>
				<div className="w-[40%] h-full m-[1%] px-[1%] py-[2%] bg-amber-500 flex justify-center items-center text-[0.9vw] text-black font-bold rounded-xl select-none">K</div>
				<div className="w-[30%] h-full m-[1%] px-[1%] py-[2%] bg-amber-500 flex justify-center items-center text-[0.9vw] rounded-xl select-none">NIEPARZYSTE</div>
			</div>
				
{/* Yout bet */}
			<div className="w-full h-[15%] flex justify-center items-center p-[2%] bg-[#525864] rounded-xl my-[1%]">
				<p className="text-center text-[1vw]">100</p>
			</div>

{/* All bets */}
			<div className="w-full h-[65%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p>1</p>
					</div>
					<div>
						<p>Łączny zakład: 100</p>
					</div>
				</div>
				<hr/>
				<div className="flex justify-between items-center h-10">
					<p>Rudy</p>
					<div className="flex items-center gap-1">
						<p className="font-bold text-lg">100</p>
						<div className="w-4 h-8 bg-amber-500 text-black flex justify-center items-center rounded-lg">K</div>
					</div>
				</div>
			</div>
		</div>

{/* Black */}
		<div className="w-[30%] flex flex-col"> {/* Bets */}
			<div className="w-full h-1/5 p-[1%] flex justify-between items-center bg-[#525864] rounded-xl">
				<div className="w-1/3 h-full px-[1%] py-[2%] bg-[#18181b] flex justify-center items-center text-[0.8vw] rounded-xl select-none">CZARNE</div>
				<div className="w-2/3 h-full flex justify-around items-center">
				{
						[
							{text: 8},
							{text: 9},
							{text: 10},
							{text: 11},
							{text: 12},
							{text: 13},
							{text: 14},
						].map((div, index) => (
							<div key={index} className="w-[12%] h-full px-[1%] bg-[#18181b] flex justify-center items-center text-[1vw] rounded-xl select-none">
								{div.text}
							</div>
						))
				}
				</div>
			</div>

{/* Yout bet */}
			<div className="w-full h-[15%] flex justify-center items-center p-2 bg-[#525864] rounded-xl my-1">
				<p className="text-center text-lg">100</p>
			</div>

{/* All bets */}
			<div className="w-full h-[65%] p-2 bg-[#525864] rounded-xl overflow-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center">
						<Image src={blankProfile} alt="blankProfile" draggable={false} className="w-10"/>
						<p>2</p>
					</div>
					<div>
						<p>Łączny zakład: 200</p>
					</div>
				</div>
				<hr/>
				<div className="flex justify-between items-center h-10">
					<p>Rudy</p>
					<div className="flex items-center gap-1">
						<p className="font-bold text-lg">100</p>
						<div className="w-4 h-8 bg-black flex justify-center items-center rounded-lg"></div>
					</div>
				</div>
				<div className="flex justify-between items-center h-10">
					<p>Rudy</p>
					<div className="flex items-center gap-1">
						<p className="font-bold text-lg">100</p>
						<div className="w-4 h-8 bg-black flex justify-center items-center rounded-lg">10</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</>
  	)
}

export {Roulette};