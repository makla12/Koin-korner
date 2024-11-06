import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from "@/components/elements/MainNav";
function ProvablyFairPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);

    const fetchLogin = async () => {
        const res = await axios.get("http://localhost:8080/auth/checkLogIn",{withCredentials:true});
        // await axios.post("http://localhost:8080/auth/logOut", {}, {withCredentials:true});
        setIsLoggedIn(res.data.isLoggedIn);

    }
    useEffect(()=>{
        fetchLogin();
    },[])
	
  	return (
	<>
		<MainNav isLoggedIn={isLoggedIn} />
    	<div className="m-4">
			<p className="mt-4">Wszystkie role na koin korner są wygenerowane przez system "provably fair". Czyli wynik każdego rolla nie może być manipulowany i jest z góry ustalony. Gracze mogą sprawdzać seed każdego wcześniejszego rolla używając tego kodu:</p>
			<p className="text-center m-7">
			$server_seed = "2754f7cc9e9e243711448401ea9d483067138a6b37c70c5d80b6c59943aa6996";<br/>
			$lotto = "1135567382";<br/>
			$round_id = "1";<br/>
			$hash = hash("sha256", $server_seed . "-" . $lotto . "-" . $round_id);<br/>
			$roll = hexdec(substr($hash, 0, 8)) % 15;<br/>
			echo "Round $round_id = $roll";<br/>
			</p>
    	</div>
	</>
  	);
}

export { ProvablyFairPage };
