import { useRef } from "react";

function Crash() {
	const input1Ref = useRef(null);
	const input2Ref = useRef(null);
	
	function changeInput(action) {
		if (input1Ref.current) {
			switch (action) {
				case "+10":
					console.log(Number(input1Ref.current.value))
					input1Ref.current.value = Number(input1Ref.current.value) + 10;
					break;
				case "+100":
					input1Ref.current.value = Number(input1Ref.current.value) + 100;
					break;
				case "+1000":
					input1Ref.current.value = Number(input1Ref.current.value) + 1000;
					break;
				case "1/2":
					input1Ref.current.value = Number(input1Ref.current.value) / 2;
					break;
				case "x2":
					input1Ref.current.value = Number(input1Ref.current.value) * 2;
					break;
				case "MAX":
					input1Ref.current.value = balance;
					break;
			}
		}
	}

  	return (
    <>
	{/* e^{0.0693x} */}
	<div className="w-full h-full p-2">
		<div className="w-full h-[45%] flex items-center bg-[#525864] rounded-lg my-2">
			<div className="w-[60%] h-full border-r-black border-r-2"></div>

			<div className="w-[40%] h-full p-1">
				<form className="w-full h-1/4">
					<div className="flex justify-center items-center">
						<div className="w-1/2 flex flex-col justify-center items-center">
							<label htmlFor="bet" className="select-none h-1/2">Zakład:</label>
							<input type="number" name="bet" id="bet" ref={input1Ref} className="
							w-3/4 h-1/2 rounded-lg p-2 m-1 bg-[#525864] border border-black select-none
							"/>
						</div>
						<div className="w-1/2 flex flex-col justify-center items-center">
							<label htmlFor="auto" className="select-none h-1/2">Auto wypłata:</label>
							<div className="flex justify-center items-center">
								<input type="number" name="auto" id="auto" ref={input2Ref} className="
								w-1/2 h-1/2 rounded-lg p-2 m-1 bg-[#525864] border border-black select-none
								"/>
								<input type="checkbox" name="autoEnable" id="autoEnable" className="
								w-6 h-6 m-1 hover:cursor-pointer"/>
							</div>
						</div>
					</div>
				</form>

				<div className="flex justify-around">
					{
						[
							{text: "+10"},
							{text: "+100"},
							{text: "+1000"},
							{text: "1/2"},
							{text: "x2"},
							{text: "MAX"}
						].map((div, index) => (
							<div key={index} className={`
							w-[12.5%] h-full select-none flex justify-center items-center text-lg ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#28282a]"}
							m-1 p-2 rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#37393f]"}
							`} onClick={()=>{ changeInput(div.text) }}>
								{div.text}
							</div>
						))
					}
				</div>

				<div className="flex flex-col justify-center items-center">
					<button className="w-[90%] bg-[#00bf62] text-xl p-4 rounded-full hover:bg-[#56ce7a] my-2 select-none">
						ZAKŁAD 1
					</button>
					<button className="w-[90%] bg-[#00bf62] text-xl p-4 rounded-full hover:bg-[#56ce7a] my-2 select-none">
						ZAKŁAD 2
					</button>
				</div>
			</div>
		</div>

		<div className="w-full h-[10%] flex justify-around items-center bg-[#525864] rounded-lg my-2">
			{
				[
					{text: "20.32", color: "green"},
					{text: "1.23", color: "red"},
					{text: "3.21", color: "green"},
					{text: "2.01", color: "green"},
					{text: "1.12", color: "red"},
					{text: "1.30", color: "red"},
					{text: "1.00", color: "black"},
					{text: "1.11", color: "red"},
					{text: "1.06", color: "red"},
					{text: "4.26", color: "green"}
				].map((div, index) => (
					<div key={index} className={`
						w-1/12 h-[70%]
						${div.color == "green" ? "bg-[#00bf62]" : div.color == "red" ? "bg-red-500" : "bg-black"} 
						text-3xl text-${div.number === "K" ? "[#181818]" : "[#e6e6e6]"} p-1 text-xl
						rounded-full flex flex-shrink-0 justify-center items-center select-none`}
					>{div.text}</div>
				))
			}
		</div>

		<div className="w-full h-2/5 bg-[#525864] rounded-lg">
			<div className="border-b-2 border-black w-full h-[10%]">
				<p className="w-1/2">GRACZ</p>
				<p className="w-[15%]">WYPŁATA</p>
				<p className="w-[15%]">ZAKŁAD</p>
				<p className="w-[15%]">ZYSK</p>
			</div>
				
			<div className="w-full flex justify-around items-center">
				<p>Rudy</p>
				<p>x2.45</p>
				<p>100</p>
				<p>245</p>
			</div>
		</div>
	</div>
		
    </>
  	);
}

export { Crash };