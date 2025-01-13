import Image from 'next/image';
import Link from 'next/link';
import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import { useState } from 'react';
import axios from 'axios';
import { Popup } from '@mui/base/Unstable_Popup/Popup';

function MainNav({ isLoggedIn, username, balance }) {
    const [anchor, setAnchor] = useState(null);
    const [anchor2, setAnchor2] = useState(null);

    function showProfile(event) {
        setAnchor2(anchor2 ? null : event.currentTarget);
    }
    const open2 = Boolean(anchor2);
    const id2 = open2 ? 'simple-popper' : undefined;

    return (
        <div className="
            flex flex-row justify-between 
            w-full h-28 bg-[#27272a]"
        >
            {/* First half of nav */}
            <div className="flex justify-center items-center select-none">

                {/* Title */}
                <Link href="/" id="title" className="
                    h-full flex justify-center items-center
                    px-2.5 py-0.5 tracking-[0.25rem]
                    text-yellow-500 cursor-pointer"
                >
                    <h1 className="text-2xl text-center transition-all ease-in-out hover:text-yellow-400">KOIN KORNER</h1>
                </Link>
                
                {/* Rest of links */}
                {
                    [
                        {name: "Wpłacanie", href: "/WIP"},
                        {name: "Wypłacanie", href: "/WIP"},
                        {name: "Dowód uczciwości", href: "/provablyFair"}
                    ].map((div, index) => (
                        <Link href={div.href} key={index} className="
                            text-xl text-[#181818] dark:text-[#e6e6e6] text-center hover:text-[#505050] dark:hover:text-[#aaaaaa] hover:translate-y-1 hover:cursor-pointer
                            flex justify-center items-center h-full px-2.5 py-0.5 transition-all ease-in-out"
                        >
                            <div className="tracking-widest">{div.name}</div>
                        </Link>
                    ))
                }
            
            </div>
            
            {/* Second half of nav */}
            <div className="flex justify-center items-center select-none">
                {isLoggedIn == null ? "Loading..." : isLoggedIn ?
                <>
                { /* Coins */ }
                <div className="
                    h-full px-2.5 py-0.5 
                    flex justify-center items-center gap-5
                    text-[#f7f7f7] font-title"
                >
                    <p className="h-1/2 text-5xl text-center flex justify-center items-center">{balance.toFixed(0)}</p>
                    <Image src={koinPic} alt="koin" draggable={false} className="h-1/2 w-auto"/>
                </div>
                {/* Profile */}
                <div className="
                    h-full hover:text-[#aaaaaa] hover:cursor-pointer
                    px-2.5 py-0.5
                    flex justify-center items-center"
                >
                    <Image src={profilePic} alt="profile pic" draggable={false} className="w-full h-5/6 rounded-full" onClick={showProfile}/>
                    <Popup id={id2} open={open2} anchor={anchor2}>
                        <div className="
                            bg-[#303030] text-[#f3f3f3]
                            border-1 border-[#8b8a8a] w-64 h-24 select-none mr-4"
                        >
                            <div className='h-10 text-xl flex items-center justify-center'>
                                {username}
                            </div>
                            <div className='h-10 flex items-center justify-center bg-[#303030] cursor-pointer hover:bg-[#202020]' 
                                onClick={async ()=>{
                                    axios.post("http://localhost:8080/auth/logOut", {}, {withCredentials:true});
                                    window.location.reload();
                                }}
                            >Wyloguj</div>
                        </div>
                    </Popup>
                </div>
                </>

                :

                <div className="flex justify-center items-center text-xl">
                    <Link href="signup" className="
                        text-[#181818] text-xl flex justify-center items-center 
                        bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 hover:translate-y-1 select-none
                        py-3 px-4 rounded-xl m-3 transition-all ease-in-out"
                    >Zarejestruj się</Link>
                    
                    <Link href="login" className="
                        text-[#181818] text-xl flex justify-center items-center 
                        bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 hover:translate-y-1 select-none
                        py-3 px-4 rounded-xl m-3 transition-all ease-in-out"
                    >Zaloguj się</Link>
                </div>
                }
                

            </div>
        </div>
    );
}

export { MainNav };