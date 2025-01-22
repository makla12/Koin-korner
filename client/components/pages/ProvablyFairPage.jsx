import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from "@/components/elements/MainNav";
function ProvablyFairPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);
    const [username, setUsername] = useState(null);

    const fetchLogin = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/auth/checkLogIn",{withCredentials:true});
        setIsLoggedIn(res.data.isLoggedIn);
        setUsername(res.data.username);

    }
    useEffect(()=>{
        fetchLogin();
    },[])
	
  	return (
	<>
		<MainNav isLoggedIn={isLoggedIn} username={username}/>
			<div className="w-full m-4 rounded-2xl bg-[#27272a] p-4">
				<p className="m-6 text-xl">Wszystkie role na koin korner są wygenerowane przez system "provably fair". Czyli wynik każdego rolla nie może być manipulowany i jest z góry ustalony. Gracze mogą sprawdzać seed każdego wcześniejszego rolla używając tego kodu:</p>
				<div className="w-1/2 m-auto flex justify-center items-center rounded-2xl bg-[#202021] p-4">
					<p className="text-center m-1">
					$server_seed = "2754f7cc9e9e243711448401ea9d483067138a6b37c70c5d80b6c59943aa6996";<br/>
					$lotto = "1135567382";<br/>
					$round_id = "1";<br/>
					$hash = hash("sha256", $server_seed . "-" . $lotto . "-" . $round_id);<br/>
					$roll = hexdec(substr($hash, 0, 8)) % 15;<br/>
					echo "Round $round_id = $roll";<br/>
					</p>
				</div>

				<p className="my-4 text-xl">Wiarygodność naszej strony jest potwierdzona przez niejakiego <b className="italic text-yellow-400">Krzysztofa Suchojada</b> (sprawdzał ten kod) i <b className="italic text-yellow-400">Macieja Sieńko</b>, zatem możesz nam naprawdę <b className="italic text-yellow-400">zaufać</b>!</p>
			</div> 	
	</>
  	);
}

export { ProvablyFairPage };
