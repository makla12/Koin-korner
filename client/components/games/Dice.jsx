import { useState, useRef } from "react";

function Dice() {
  const [multiplier, setMultiplier] = useState(1.98);
  const [chance, setChance] = useState("50%");
  const [profit, setProfit] = useState(1.98);
  const [showScore, setShowScore] = useState();
  const inputRef = useRef(null);

  function update(e) {
    setChance(e.target.value + "%");
    setMultiplier((49.5  / (e.target.value/2)).toFixed(3));
    setProfit((Number(49.5  / (e.target.value/2)) * Number(inputRef.current.value)).toFixed(3));
  }

  function changeInput(action) {
		if (inputRef.current) {
			switch (action) {
				case "0":
					inputRef.current.value = 0;
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

  function roll() {
    const number = (Math.random() * 100).toFixed(2);
    setShowScore(number);
    if (chance > number) {
      console.log(number);
    }
  }

    return (
    <div className="w-full h-full p-2 flex flex-col justify-between">

      <div className="w-full h-2/3 my-2 bg-[#525864] rounded-xl flex flex-col justify-around">
        {/* FORM */}
        <form className="w-full h-[40%] flex flex-col justify-center">
          <div className="flex h-3/4 justify-around items-center">
            {
              [
                {text: "MNOŻNIK:", value: multiplier},
                {text: "SZANSA:", value: chance},
                {text: "ZYSK PRZY WYGRANEJ:", value: profit}
              ].map((div, key) => (
                <div key={key} className="w-1/3 p-1 flex flex-col justify-center items-center select-none">
                  <label htmlFor="bet" className="select-none h-1/2 text-lg">{div.text}</label> 
                  <input type="text" disabled value={div.value} className="
                  w-2/3 h-1/2 rounded-full py-1 px-3 m-1 bg-[#525864] border border-black select-none text-lg
                  "/>
              </div>
              ))
            }
            </div>
            
            <div className="w-full h-1/4 mt-[1%] flex flex-col justify-center items-center">
             
              <div className="w-full h-3/4 flex justify-center items-center">
                <p className="mx-1 text-xl select-none">0</p>
                <div className="w-[1%] h-full bg-[#ff0000] rounded-l-full"></div>
                <input type="range" min="2" max="98" id="diceSlider" className="
                w-3/4 h-full bg-[#00bf63]
                " onChange={update}/>
                <div className="w-[1%] h-full bg-[#00bf63] rounded-r-full"></div>              
                <p className="mx-1 text-xl select-none">100</p>
              </div>
              <div className={`w-[77%] h-1/4 flex flex-col translate-x-[${showScore - 1}%]`}>
                <p className="text-sm">{showScore == null ? "" : "⬆"}</p>
                <p className="text-sm">{showScore == null ? "" : showScore}</p>
              </div>
            </div>
        </form>

        {/* BET */}
        <div className="w-full h-1/3 flex flex-col justify-center">
            <div className="h-1/2 flex flex-col justify-center items-center">
							<label htmlFor="bet" className="select-none h-1/3 text-lg">Zakład:</label> 
							<input type="number" name="bet" id="bet" ref={inputRef} className="
							w-1/3 h-2/3 rounded-lg p-2 mb-[2%] mt-[0.5%] bg-[#525864] border border-black select-none
							" onChange={betRound}/>
						</div>

            <div className="h-1/2 flex justify-center">
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
                w-[7.5%] h-5/6 select-none flex justify-center items-center text-lg ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#28282a]"}
                mx-[0.75%] rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#37393f]"}
                `} onClick={()=>{ changeInput(div.text) }}>
                  {div.text}
                </div>
              ))
            }
          </div>
        </div>

        <div className="w-full h-[12.5%] flex justify-center items-center">
          <button className="w-1/2 h-full bg-[#00bf63] text-lg p-4 rounded-full hover:bg-[#56ca72] select-none flex justify-center items-center"  onClick={roll}>
            WYPŁAĆ
          </button>
        </div>
      </div>

      <div className="w-full h-1/3 my-2 bg-[#525864] rounded-xl">
        <div className="border-b-2 border-black w-full h-[15%] flex justify-around items-center">
          <p className="w-1/2 text-center">GRACZ</p>
          <p className="w-[15%] text-center">ZAKŁAD</p>
          <p className="w-[15%] text-center">SZANSA</p>
          <p className="w-[15%] text-center">WYNIK</p>
          <p className="w-[15%] text-center">ZYSK</p>
        </div>
          
        <div className="w-full flex justify-around items-center my-[1%]">
          <p className="w-1/2 text-center">Rudy</p>
          <p className="w-[15%] text-center">100</p>
          <p className="w-[15%] text-center">50.00%</p>
          <p className="w-[15%] text-center">43.21</p>
          <p className="w-[15%] text-center text-green-500">+100</p>
        </div>

        <div className="w-full flex justify-around items-center my-[1%]">
          <p className="w-1/2 text-center">Hazardzista123</p>
          <p className="w-[15%] text-center">200</p>
          <p className="w-[15%] text-center">30.00%</p>
          <p className="w-[15%] text-center">74.12</p>
          <p className="w-[15%] text-center text-red-500">200</p>
        </div>
      </div>
    </div>
    );
}
  
export { Dice };