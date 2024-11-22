import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Roulette } from '@/components/games/Roulette'

function RoulettePage() {
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
		<div className="w-full flex justify-between items-center p-[0.8%] h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Roulette />
			</GameContainer>
		</div>
    </>
  	);
}

export { RoulettePage };