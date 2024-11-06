import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Crash } from '@/components/games/Crash'

function CrashPage() {
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
		<MainNav isLoggedIn={isLoggedIn}/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Crash />
			</GameContainer>
		</div>
    </>
  );
}

export { CrashPage };