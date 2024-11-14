import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Tower } from '@/components/games/Tower.jsx'

function TowerPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);

    const fetchLogin = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/auth/checkLogIn",{withCredentials:true});
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
				<Tower />
			</GameContainer>
		</div>
    </>
  	);
}

export { TowerPage };