import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import wip from "@/public/wip.png";
import { MainNav } from '@/components/elements/MainNav';


function WIPPage() {
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
        <div className="flex justify-center items-center">
            <Image src={wip} alt="work in progress"/>
        </div>
        <h1 className="text-3xl text-center my-10">Nadal trwają prace nad tą stroną</h1>
    </>
  );
}

export { WIPPage };