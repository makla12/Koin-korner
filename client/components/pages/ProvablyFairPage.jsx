import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MainNav } from "@/components/elements/MainNav";

function ProvablyFairPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);
    const [username, setUsername] = useState(null);
    const [balance, setBalance] = useState(0);
	const [table, setTable] = useState([]);

    const fetchLogin = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/auth/checkLogIn",{withCredentials:true});
        setIsLoggedIn(res.data.isLoggedIn);
        setUsername(res.data.username);
    }

    const getBalance = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/app/balance",{withCredentials:true})
        setBalance(Number(res.data.balance));
    }

	const getTable = async () => {
		const res = await axios.get("http://" + window.location.hostname + ":8080/app/rouletteSeeds");
		setTable(res.data);
	}

    useEffect(()=>{
        fetchLogin();
		getBalance();
		getTable();
    },[])
	
	return (
	<>
		<MainNav isLoggedIn={isLoggedIn} username={username} balance={balance}/>
			<div className='w-full p-4 flex justify-center'>
				<div className="w-[99%] rounded-2xl bg-[#27272a] p-4">
					<div className="
						w-full h-32 flex justify-center items-center  
						bg-[#d3d3d3] dark:bg-[#27272a] rounded-full"
					>
						{[
							{name: "Ruletka", href: "/provablyFair"},
							{name: "Crash", href: "/provablyFairCrash"},
						]
						.map((div, index) => (
							<Link key={index} href={div.href} className="
								text-[#181818] text-2xl w-1/5 h-[70%]  flex justify-center items-center 
								bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 hover:text-[1.6rem] select-none
								p-1.5 rounded-full mx-2 transition-all ease-in-out"
							>
								<h2>{div.name}</h2>
							</Link>
						))}
					</div>

					<p className="m-6 text-xl">Wszystkie role na koin korner są wygenerowane przez system "provably fair". Czyli wynik każdego rolla nie może być manipulowany i jest z góry ustalony. Gracze mogą sprawdzać seed każdego wcześniejszego rolla używając tego kodu:</p>
					<div className="w-[60%] m-auto flex justify-center items-center rounded-2xl bg-[#202021] p-4">
						<code>
							let hash = crypto.createHash("sha256").update(serverSeed).update(publicSeed).update(round).digest("hex"); <br />
							let roll = Number("0x" + hash.substring(0,8)) % 15; <br />
							console.log(roll);
						</code>
					</div>

					<p className="my-4 text-xl">Wiarygodność naszej strony jest potwierdzona przez niejakiego <b className="italic text-yellow-400">Krzysztofa Suchojada</b> (sprawdzał ten kod) i <b className="italic text-yellow-400">Macieja Sieńko</b>, zatem możesz nam naprawdę <b className="italic text-yellow-400">zaufać</b>!</p>
					<p className="text-red-500">*Czerwone - hash seeda(nie prawdziwy seed)</p>
			
					<table className="w-3/4 m-auto my-4 border">
						<thead>
							<tr className="border">
								<th className="border">Date</th>
								<th className="border">Server seed</th>
								<th className="border">Public seed</th>
								<th className="border">Round</th>
							</tr>
						</thead>
						<tbody>
							{table.map((value, index)=>(
								<tr key={index} className="border">
									<td className="border">{value.date.substring(0,10)}</td>
									<td className={`border ${index == 0 ? "text-red-500" : ""}`}>{value.serverSeed}</td>
									<td className="border">{value.publicSeed}</td>
									<td className="border">{value.maxRound} - {value.minRound}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
	</>
	);
}

export { ProvablyFairPage };
