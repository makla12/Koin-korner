import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import wip from "@/public/wip.png";
import { MainNav } from '@/components/elements/MainNav';


function WIPPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);
    const [username, setUsername] = useState(null);
    const [balance, setBalance] = useState(0);

    const fetchLogin = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/auth/checkLogIn",{withCredentials:true});
        setIsLoggedIn(res.data.isLoggedIn);
        setUsername(res.data.username);
    }

    const getBalance = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/app/balance",{withCredentials:true})
        setBalance(Number(res.data.balance));
    }

    useEffect(()=>{
        fetchLogin();
        getBalance();
    },[])
	
  return (
    <>
		<MainNav isLoggedIn={isLoggedIn} username={username} balance={balance} />
        <div className="flex justify-center items-center">
            <Image src={wip} alt="work in progress"/>
        </div>
        <h1 className="text-3xl text-center my-10">Nadal trwają prace nad tą stroną</h1>
    </>
  );
}

export { WIPPage };