import { io } from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import { ResponsiveChartContainer, ChartsXAxis, ChartsYAxis, LinePlot} from "@mui/x-charts";
import { CrashBet } from "../elements/CrashBet";
import { Alert } from "@/components/elements/Alert";
import axios from "axios";

function Crash({ isLogedIn, username, updateBalance, balance }) {
	const animationQuality = 10;
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
	const [xAxisView, SetXAxisView] = useState([]);
	const [multiplierView, SetMultiplierView] = useState([]);
	const [allBets, setAllBets] = useState([]);
	const [AlertInfo, setAlertInfo] = useState([]);
	const [betsHistory, setBetsHistory] = useState([]);
	const getBetsHistory = async () => {
		const res = await axios.get("http://" + window.location.hostname + ":8080/app/crashBetHistory");
		setBetsHistory(res.data.betsHistory);
	}

	const betsSorted = allBets.sort((a,b) => (a.bet < b.bet ? 1 : (a.bet > b.bet ? -1 : 0)));
	const selfBets = allBets.filter((item) => item.name == username);
	const selfBet1 = selfBets.filter(value => value.betNum == 0);
	const selfBet2 = selfBets.filter(value => value.betNum == 1);

	const bet1Active = selfBet1.length != 0  && !isCrashed && selfBet1[0].active;
	const bet2Active = selfBet2.length != 0 && !isCrashed && selfBet2[0].active;
	
	const xAxis = useRef([]);
	const multiplier = useRef([]);

	const bet = (betNum) => {
		if(!input1Ref.current) return;

		crashSocket.emit("bet", betNum, Number(input1Ref.current.value));
	}

	const cashOutBet = (betNum) => {
		crashSocket.emit("cashOutBet", betNum);
	}

	const startCrash = (crashTime) => {
		crashTimer.current = crashTime * animationQuality;
		timerIsPlaying.current = false;
		setPlayTimer(false);
		xAxis.current = [];
		multiplier.current = [];
		setCrashTime(crashTimer.current);
		SetXAxisView(xAxis.current);
		SetMultiplierView(multiplier.current);
	}

	const startTimer = (time) => {
		SetMultiplierView([]);
		timeLeft.current = time * 10;
		timerIsPlaying.current = true;
		setPlayTimer(true);
	}

	if(xAxis.current.length > crashTime && !isCrashed){
		xAxis.current = [0];
		multiplier.current = [1];
	}

	while(xAxis.current.length <= crashTime && !isCrashed){
		xAxis.current.push(xAxis.current.length / animationQuality);
		multiplier.current.push(Math.pow(Math.E, 0.1 * multiplier.current.length / animationQuality));
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
		getBetsHistory();
		setCrashSocket(io(window.location.hostname + ":8080/crashNS", {withCredentials: true}));

//Timer
		const timeInterval = setInterval(()=>{
			if(!timerIsPlaying.current) return;

			if(timeLeft.current <= 0) {
				crashTimer.current = 0;
				if(timerRef.current) timerRef.current.innerHTML = "0.0";
				startCrash(0);
				return;
			}

			timeLeft.current = timeLeft.current - 1;

			if(timerRef.current) timerRef.current.innerHTML = `${(timeLeft.current/10).toFixed(1)}`;
		},100);

		return () => {
			clearInterval(timeInterval);
		}
	}, [])

	useEffect(() => {
		if(!crashSocket) return;

		crashSocket.on("initialParams", (crashTimeStart, isCrashed, timeCrashed, crashBets, timeFromStart) => {
			setAllBets(crashBets);
			if(timeFromStart < 5) startTimer(5 - timeFromStart); 

			else startCrash(timeFromStart - 5);

			setIsCrashed(false);

			if(isCrashed){
				setIsCrashed(true);
				while(xAxis.current.length <= (timeCrashed - crashTimeStart - 5000) / 200){
					xAxis.current.push(xAxis.current.length / 5);
					multiplier.current.push(Math.pow(Math.E, 0.1 * multiplier.current.length / 5));
				}

				setTimeout(()=>{
					SetMultiplierView([]);
					setAllBets([]);
					setIsCrashed(false);
					startTimer(5);
				},2000 - (Date.now() - timeCrashed) );
			}
		});
		
		crashSocket.on("confirmBet", () => {
			updateBalance();
		});

		crashSocket.on("errorMes", (message) => {
			showAlert(false, message);
		});

		crashSocket.on("crash", () => {
			setIsCrashed(true);
			setTimeout(()=>{
				SetMultiplierView([]);
				setAllBets([]);
				setIsCrashed(false);
				startTimer(5);
			},2000);
		});

		crashSocket.on("updateCrash", (crashTime) => {
			if(timerIsPlaying.current) return;

			crashTimer.current = crashTime * animationQuality;
			setCrashTime(crashTimer.current);
			SetXAxisView(xAxis.current);
			SetMultiplierView(multiplier.current);
		});

		crashSocket.on("newCrash", ()=>{
			getBetsHistory();
		});

		return ()=>{
			crashSocket.off("initialParams");
			crashSocket.off("crash");
			crashSocket.off("confirmBet");
			crashSocket.off("errorMes");
		}
	},[crashSocket]);

	useEffect(()=>{
		if(!crashSocket) return;

		crashSocket.on("addBet",(betObj) => {
			let arr = Array.from(allBets);
			arr.push(betObj);
			setAllBets(arr);
		});

		crashSocket.on("updateBet", (betIndex, betObj) => {
			let arr = Array.from(allBets);
			arr[betIndex] = betObj;
			setAllBets(arr);
		});

		return ()=>{
			crashSocket.off("addBet");
			crashSocket.off("updateBet");
		}
	},[crashSocket, allBets])

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

	<div className="w-full h-full p-2">
{/* Crash and inputs */}
		<div className="w-full h-[45%] flex items-center bg-[#525864] rounded-lg my-2 relative">
			<div ref={timerRef} className={`w-[60%] h-full top-0 left-0 bg-[#525864] z-10 flex justify-center items-center text-5xl select-none ${(!playTimer ? "hidden" : "")}`}></div>

			<div className={`w-[60%] h-full border-r-black border-r-2 relative ${(playTimer ? "hidden" : "")}`}>
				<p className={`z-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
					text-5xl ${!isCrashed ? "text-[#3baa60]" : "text-[#ef4444]"} select-none`}
				>x{(multiplier.current.length != 0 ? (multiplier.current[multiplier.current.length - 1]).toFixed(2) : "1.00")}</p>
				<ResponsiveChartContainer 
					xAxis={[{ data: xAxisView}]}
					yAxis={[{ min: 1 }]}
					series={[
						{
							type:"line",
							data: multiplierView,
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

						{/*<div className="w-1/2 flex flex-col justify-center items-center">
							<label htmlFor="auto" className="select-none h-1/2">Auto wypłata:</label>
							<div className="flex justify-center items-center">
								<input type="number" name="auto" id="auto" ref={input2Ref} className="
								w-1/2 h-1/2 rounded-lg p-2 m-1 bg-[#525864] border border-black select-none
								"/>
								<input type="checkbox" name="autoEnable" id="autoEnable" className="
								w-6 h-6 m-1 hover:cursor-pointer"/>
							</div>
						</div> */}

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
							w-[4vw] h-full select-none flex justify-center items-center text-lg ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#28282a]"}
							m-1 p-2 rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#37393f]"}
							`} onClick={()=>{ changeInput(div.text) }}>
								{div.text}
							</div>
						))
					}
				</div>

				<div className="flex flex-col justify-center items-center">
					<button className="w-[25vw] bg-[#00bf62] text-xl p-4 rounded-full hover:bg-[#56ce7a] my-2 select-none"
						onClick={()=>{
							if(bet1Active){
								cashOutBet(0);
								return;
							}

							bet(0);
						}}
						>{bet1Active ? `WYPŁAĆ: ${(selfBet1[0].bet * (multiplierView.length != 0 ? multiplierView[multiplierView.length - 1] : 1)).toFixed(0)}` : "ZAKŁAD 1"}
					</button>
					<button className="w-[25vw] bg-[#00bf62] text-xl p-4 rounded-full hover:bg-[#56ce7a] my-2 select-none"
						onClick={()=>{
							if(bet2Active){
								cashOutBet(1);
								return;
							}

							bet(1);
						}}
						>{bet2Active ? `WYPŁAĆ: ${(selfBet2[0].bet * (multiplierView.length != 0 ? multiplierView[multiplierView.length - 1] : 1)).toFixed(0)}` : "ZAKŁAD 2"}
					</button>
				</div>
			</div>
		</div>
{/* Bets history */}
		<div className="w-full h-[10%] flex justify-around items-center bg-[#525864] rounded-lg my-2">
			{ 
				betsHistory.map((div, index) => (
					<div key={index} className={`
						w-1/12 h-[70%]
						${div.score > 1.8 ? "bg-[#00bf62]" : div.score == 1 ? "bg-black" : "bg-red-500"} 
						text-xl p-1
						rounded-full flex flex-shrink-0 justify-center items-center select-none`}
					>{div.score}</div>
				))
			}
		</div>

{/* Bets */}
		<div className="w-full h-2/5 bg-[#525864] rounded-lg">
			<div className="border-b-2 border-black w-full h-[10%] flex justify-around items-center">
				<p className="w-1/2 text-center">GRACZ</p>
				<p className="w-[15%] text-center">WYPŁATA</p>
				<p className="w-[15%] text-center">ZAKŁAD</p>
				<p className="w-[15%] text-center">ZYSK</p>
			</div>
			
			{betsSorted.map((value, index) => (
				<CrashBet key={index} name={value.name} bet={value.bet} cashOut={value.cashOutMult} self={value.name == username} />
			))}
		</div>
	</div>
    </>
	);
}

export { Crash };