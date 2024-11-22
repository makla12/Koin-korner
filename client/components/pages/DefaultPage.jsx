import { useEffect, useState } from 'react';
import axios from 'axios';
import { MainNav } from '@/components/elements/MainNav';
import { GameContainer } from '@/components/elements/GameContainer';

function DefaultPage() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null);
    const [username, setUsername] = useState(null);

    const fetchLogin = async () => {
        const res = await axios.get("http://" + window.location.hostname + ":8080/auth/checkLogIn",{withCredentials:true});
        setIsLoggedIn(res.data.isLoggedIn);
        setUsername(res.data.username);
    }
    useEffect(()=>{
        console.log("http://" + window.location.hostname + ":8080/auth/checkLogIn");
        fetchLogin();
    },[])

    return (
    <>
		<MainNav isLoggedIn={isLoggedIn} username={username}/>
        <div className="flex justify-between items-center p-5 h-[87.5vh]">
            <GameContainer>
                <div>DefaultPage (tutaj będzie coś o stronie)</div>
            </GameContainer>
        </div>
    </>
    );
}

export { DefaultPage };