import { io } from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import { ResponsiveChartContainer, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";

function Crash(balance) {
	const input1Ref = useRef(null);
	const input2Ref = useRef(null);
	const timeLeft = useRef(50);
	const timerRef = useRef(null);
	const crashTimer = useRef(0);
	const timerIsPlaying = useRef(true);

	const [crashSocket, setCrashSocket] = useState(null);
	const [crashTime, setCrashTime] = useState(0);
	const [playTimer, setPlayTimer] = useState(true);
	const [isCrashed, setIsCrashed] = useState(false);
	
	const xAxis = useRef([]);
	const multiplier = useRef([]);

	const startCrash = (crashTime) => {
		crashTimer.current = crashTime * 5;
		timerIsPlaying.current = false;
		xAxis.current = [];
		multiplier.current = [];
		setPlayTimer(false);
	}

	const startTimer = (time) => {
		timeLeft.current = time * 10;
		timerIsPlaying.current = true;
		setPlayTimer(true);
	}

	if(xAxis.current.length > crashTime && !isCrashed){
		xAxis.current = [];
		multiplier.current = [];
	}

	while(xAxis.current.length <= crashTime && !isCrashed){
		xAxis.current.push(xAxis.current.length / 5);
		multiplier.current.push(Math.pow(Math.E, 0.1 * multiplier.current.length / 5));
	}

	function changeInput(action) {
		if (input1Ref.current) {
			switch (action) {
				case "0":
					input1Ref.current.value = 0;
					break;
				case "+10":
					input1Ref.current.value = Number(input1Ref.current.value) + 10;
					betRound();
					break;
				case "+100":
					input1Ref.current.value = Number(input1Ref.current.value) + 100;
					betRound();
					break;
				case "+1000":
					input1Ref.current.value = Number(input1Ref.current.value) + 1000;
					betRound();
					break;
				case "1/2":
					input1Ref.current.value = Number(input1Ref.current.value) / 2;
					betRound();
					break;
				case "x2":
					input1Ref.current.value = Number(input1Ref.current.value) * 2;
					betRound();
					break;
				case "MAX":
					input1Ref.current.value = balance;
					break;
			}
		}
	}
	
	function betRound() {
		input1Ref.current.value = Math.floor(Number(input1Ref.current.value));
	}
	
	useEffect(() => {
		setCrashSocket(io(window.location.hostname + ":8080/crashNS", {withCredentials: true}));
//Crash animation
		const inter = setInterval(()=>{
			crashTimer.current += 1;
			setCrashTime(crashTimer.current);
		},200);

//Timer
		const timeInterval = setInterval(()=>{
			if(!timerIsPlaying.current) return;

			if(timeLeft.current <= 0) {
				crashTimer.current = 0;
				if(timerRef.current) timerRef.current.innerHTML = "0.0";
				setPlayTimer(false);
				timerIsPlaying.current = false;
				return;
			}

			timeLeft.current = timeLeft.current - 1;

			if(timerRef.current) timerRef.current.innerHTML = `${(timeLeft.current/10).toFixed(1)}`;
		},100);

		return () => {
			clearInterval(inter);
			clearInterval(timeInterval);
		}
	}, [])

	useEffect(() => {
		if(!crashSocket) return;

		crashSocket.on("initialParams", (crashTimeStart, isCrashed, timeCrashed) => {
			const timeFromStart = (Date.now() - crashTimeStart) / 1000;
			
			if(timeFromStart < 5) startTimer(5 - timeFromStart); 

			else startCrash(timeFromStart - 5);

			setIsCrashed(false);

			if(isCrashed){
				setIsCrashed(true);
				console.log(timeCrashed - crashTimeStart);
				console.log(timeFromStart);
				while(xAxis.current.length <= (timeCrashed - crashTimeStart - 5000) / 200){
					xAxis.current.push(xAxis.current.length / 5);
					multiplier.current.push(Math.pow(Math.E, 0.1 * multiplier.current.length / 5));
				}
			}
		});

		crashSocket.on("crash", () => {
			setIsCrashed(true);
			setTimeout(()=>{
				setIsCrashed(false);
				startTimer(5);
			},1000);
		});
	},[crashSocket]);

	return (
    <>
	{/* e^{0.1x} */}
	<div className="w-full h-full p-2">
		<div className="w-full h-[45%] flex items-center bg-[#525864] rounded-lg my-2 relative">
			<div ref={timerRef} className={`w-[60%] h-full top-0 left-0 bg-[#525864] z-10 flex justify-center items-center text-5xl select-none ${(!playTimer ? "hidden" : "")}`}></div>

			<div className={`w-[60%] h-full border-r-black border-r-2 relative ${(playTimer ? "hidden" : "")}`}>
				<p className={`z-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
					text-5xl ${!isCrashed ? "text-[#3baa60]" : "text-[#ef4444]"} select-none`}
				>x{(multiplier.current[multiplier.current.length - 1]).toFixed(2)}</p>

				<ResponsiveChartContainer 
					xAxis={[{ data: xAxis.current}]}
					yAxis={[{ min: 1 }]}
					series={[
						{
							type:"line",
							data: multiplier.current,
							color: `${!isCrashed ? "#00bf62" : "#ef4444"}`,
							area:true
						},
					]}

					className="w-full h-full select-none"
				>
					<LinePlot skipAnimation={true} />
					<ChartsXAxis />
					<ChartsYAxis />	
				</ResponsiveChartContainer>
			</div>

			<div className="w-[40%] h-full p-1">
				<form className="w-full h-1/4">
					<div className="flex justify-center items-center">
						<div className="w-1/2 flex flex-col justify-center items-center">
							<label htmlFor="bet" className="select-none h-1/2">Zakład:</label> 
							<input type="number" name="bet" id="bet" ref={input1Ref} className="
							w-3/4 h-1/2 rounded-lg p-2 m-1 bg-[#525864] border border-black select-none
							" onChange={betRound}/>
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
							{text: "0"},
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
			<div className="border-b-2 border-black w-full h-[10%] flex justify-around items-center">
				<p className="w-1/2 text-center">GRACZ</p>
				<p className="w-[15%] text-center">WYPŁATA</p>
				<p className="w-[15%] text-center">ZAKŁAD</p>
				<p className="w-[15%] text-center">ZYSK</p>
			</div>
				
			<div className="w-full flex justify-around items-center my-[0.5%]">
				<p className="w-1/2 text-center">Rudy</p>
				<p className="w-[15%] text-center">x2.45</p>
				<p className="w-[15%] text-center">100</p>
				<p className="w-[15%] text-center">245</p>
			</div>

			<div className="w-full flex justify-around items-center my-[0.5%]">
				<p className="w-1/2 text-center">Hazardzista123</p>
				<p className="w-[15%] text-center">x8.12</p>
				<p className="w-[15%] text-center">200</p>
				<p className="w-[15%] text-center">1624</p>
			</div>
		</div>
	</div>
    </>
	);
}

export { Crash };