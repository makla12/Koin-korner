import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Crash } from '@/components/games/Crash'

function CrashPage() {
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
		<MainNav balance={balance} isLoggedIn={isLoggedIn} username={username}/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Crash balance={balance} setBalance={setBalance}/>
			</GameContainer>
		</div>
    </>
	);
}

export { CrashPage };