import {useState, useRef, useEffect} from "react";
import { TowerLevel } from "../elements/TowerLevel";

function Tower() {
	const inputRef = useRef(null);
	const [towerDifficulty, setTowerDifficulty] = useState(1);

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
					break;
			}
		}
	}

	function betRound() {
		inputRef.current.value = Math.floor(Number(inputRef.current.value));
	}

  	return (
    <div className="w-full h-full flex">
		{/* Difficulty */}
		<div className="w-1/4 h-[95%] m-3 py-2 bg-[#525864] rounded-lg flex flex-col justify-between">
			<div className="w-full p-2">
				<div className="w-full flex flex-col items-center">
					<h1 className="text-white text-xl select-none">TRUDNOŚĆ:</h1>
					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(1)}>
						<p>Łatwe</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>

					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(2)}>
						<p>Średnie</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>

					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(3)}>
						<p>Trudne</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Bet */}
			<div className="w-full p-2">
				<form className="w-full flex flex-col items-center justify-center">
					<input type="number" name="bet" id="bet" ref={inputRef} placeholder="Zakład" className="
					w-5/6 h-10 rounded-lg p-2 m-1 bg-[#525864] select-none border-2 border-[#27262a]
					"/>
					<div className="flex flex-wrap justify-center items-center">
						{
							[
								{text: "0"},
								{text: "+10"},
								{text: "+100"},
								{text: "+1000"},
								{text: "1/2"},
								{text: "x2"},
								{text: "MAX"}
							].map((div, index) => (
								<div key={index} className={`
								w-${div.text == "MAX" ? "3/4" : "1/4"} select-none flex justify-center items-center text-lg ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#27262a]"}
								m-1 p-2 rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#383a3f]"}
								`} onClick={()=>{ changeInput(div.text) }}>
									{div.text}
								</div>
							))
						}
					</div>
				</form>
			</div>
		</div>

		<div className="w-[70%] h-[95%] m-3 py-2 bg-[#525864] rounded-lg flex flex-col justify-between">
			<div className="w-full h-4/5 px-2">
			{
				[
					{multiplier: "x34.526"},
					{multiplier: "x24.228"},
					{multiplier: "x17.002"},
					{multiplier: "x11.931"},
					{multiplier: "x8.373"},
					{multiplier: "x5.875"},
					{multiplier: "x4.123"},
					{multiplier: "x2.893"},
					{multiplier: "x2.03"},
					{multiplier: "x1.425"}
				].map((div, key) => (
					<TowerLevel multiplier={div.multiplier} key={key} difficulty={towerDifficulty}/>
				))
			}
			</div>

			<div className="w-full p-1 m-1 flex justify-center items-center">
				<button className="w-2/3 h-full bg-[#e9b308] text-lg p-4 rounded-full hover:bg-[#eeba4a]">
					WYPŁAĆ
				</button>
				{/* <button className="w-2/3 h-full bg-[#fd0100] text-lg p-4 rounded-full hover:bg-[#f34545]">
					ZAGRAJ PONOWNIE
				</button> */}
			</div>
		</div>
    </div>
  	);
}

export { Tower };