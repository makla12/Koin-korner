import {useState, useRef, useEffect, cloneElement} from "react";
import { TowerLevel } from "../elements/TowerLevel";

function Tower() {
	const inputRef = useRef(null);
	const [towerDifficulty, setTowerDifficulty] = useState(1);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [winTable, setWinTable] = useState([0, 4, 4, 2, 3, 1, 2, 5, 0, 3]);
	const multipliers = [
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
		],
		[
			{multiplier: "x613.106"},
			{multiplier: "x322.687"},
			{multiplier: "x169.836"},
			{multiplier: "x89.387"},
			{multiplier: "x47.045"},
			{multiplier: "x24.76"},
			{multiplier: "x13.032"},
			{multiplier: "x6.858"},
			{multiplier: "x3.61"},
			{multiplier: "x1.9"}
		],
		[
			{multiplier: "x35354.817"},
			{multiplier: "x12405.199"},
			{multiplier: "x4352.701"},
			{multiplier: "x1527.263"},
			{multiplier: "x535.881"},
			{multiplier: "x188.028"},
			{multiplier: "x65.975"},
			{multiplier: "x23.149"},
			{multiplier: "x8.122"},
			{multiplier: "x2.85"}
		],
];

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

	function reveal(e) {
		const level = Number((e.target.parentElement.parentElement.id).substring(5)) - 1;
		const chosenOption = Number(e.target.id.substring(10));
		if (level == currentLevel) {
			switch (towerDifficulty) {
				case 1:
					if (winTable[currentLevel] < 4) {
						// win
						// setting an img didn't work, weird
						e.target.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="90%" viewBox="0 0 256 256" xml:space="preserve">

						<defs>
						</defs>
						<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
							<circle cx="45.001" cy="47.211" r="42.791" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
							<circle cx="45" cy="42.79" r="35" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(243,158,9); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
							<path d="M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(253,216,53); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 39.88 47 l 16.603 -16.604 c 1.172 -1.171 1.172 -3.071 0 -4.242 c -1.172 -1.172 -3.07 -1.172 -4.242 0 L 38.638 39.758 V 28 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 38 c 0 1.657 1.343 3 3 3 s 3 -1.343 3 -3 V 54.242 l 13.604 13.604 c 0.586 0.586 1.354 0.879 2.121 0.879 s 1.535 -0.293 2.121 -0.879 c 1.172 -1.171 1.172 -3.071 0 -4.242 L 39.88 47 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 39.88 43 l 16.603 -16.604 c 1.172 -1.171 1.172 -3.071 0 -4.242 c -1.172 -1.172 -3.07 -1.172 -4.242 0 L 38.638 35.758 V 24 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 38 c 0 1.657 1.343 3 3 3 s 3 -1.343 3 -3 V 50.242 l 13.604 13.604 c 0.586 0.586 1.354 0.879 2.121 0.879 s 1.535 -0.293 2.121 -0.879 c 1.172 -1.171 1.172 -3.071 0 -4.242 L 39.88 43 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(253,216,53); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
						</g>
						</svg>
						`;
						setCurrentLevel(currentLevel + 1);
					} else {
						// lose
						e.target.innerHTML = "lose";
						setCurrentLevel(-1);
					}
					break;
				case 2:
					if (winTable[currentLevel] > 2) {
						// win
						e.target.innerHTML = "win";
						setCurrentLevel(currentLevel + 1);
					} else {
						// lose
						e.target.innerHTML = "lose";
						setCurrentLevel(-1);
					}
					break;
				case 3:
					if (winTable[currentLevel] > 3) {
						// win
						e.target.innerHTML = "win";
						setCurrentLevel(currentLevel + 1);
					} else {
						// lose
						e.target.innerHTML = "lose";
						setCurrentLevel(-1);
					}
					break;
			}

			if (currentLevel == -1) {
				// game over
			}
		}
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
				multipliers[towerDifficulty - 1].map((div, key) => (
					<TowerLevel multiplier={div.multiplier} key={key} difficulty={towerDifficulty} clicked={reveal} id={key}/>
				))
			}
			</div>

			<div className="w-full p-1 m-1 flex justify-center items-center">
				<button className="w-2/3 h-full bg-[#e9b308] text-lg p-4 rounded-full hover:bg-[#eeba4a] select-none">
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