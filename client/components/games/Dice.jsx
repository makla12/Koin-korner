import { useState } from "react";

function Dice() {
  const [multiplier, setMultiplier] = useState(1.94);
  const [chance, setChance] = useState(50);
  const [profit, setProfit] = useState(null);

    return (
    <div className="w-full h-full p-2 flex flex-col justify-between">
      <div className="w-full h-1/2 my-2 bg-[#525864] rounded-xl">
        <form>
          <div className="flex justify-around items-center p-1">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <label htmlFor="bet" className="select-none h-1/2">Mnożnik:</label> 
                <input type="number" disabled name="bet" id="bet" value={multiplier} className="
                w-3/4 h-1/2 rounded-full p-2 m-1 bg-[#525864] border border-black select-none
                "/>
              </div>

              <div className="w-1/2 flex flex-col justify-center items-center">
                <label htmlFor="auto" className="select-none h-1/2">Szansa:</label>
                <input type="number" disabled name="bet" id="bet" value={chance} className="
                w-3/4 h-1/2 rounded-full p-2 m-1 bg-[#525864] border border-black select-none
                "/>
              </div>

              <div className="w-1/2 flex flex-col justify-center items-center">
                <label htmlFor="auto" className="select-none h-1/2">Zysk przy wygranej:</label>
                <input type="number" disabled name="bet" id="bet" value={profit} className="
                w-3/4 h-1/2 rounded-full p-2 m-1 bg-[#525864] border border-black select-none
                "/>
              </div>
            </div>
        </form>
      </div>

      <div className="w-full h-1/2 my-2 bg-[#525864] rounded-xl">
        <div className="border-b-2 border-black w-full h-[10%] flex justify-around items-center">
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
        </div></div>
    </div>
    );
}
  
export { Dice };