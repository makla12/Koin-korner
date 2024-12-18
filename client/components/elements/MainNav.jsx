import Image from 'next/image';
import Link from 'next/link';
import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkTheme from '@/public/dark_theme.svg';
import lightTheme from '@/public/light_theme.svg';
import { Unstable_Popup as Popup } from '@mui/base';
import { useState } from 'react';
import axios from 'axios';

function MainNav({ isLoggedIn, username, balance }) {
    const [themeSrc, setThemeSrc] = useState(darkTheme);
    const [anchor, setAnchor] = useState(null);
    const [anchor2, setAnchor2] = useState(null);

    function changeTheme(changeTo) {
        const all = document.getElementById("all");
        if (changeTo == "light") {
            if (all.className[all.className.length - 1] == "k") {
                all.className = all.className.substring(0, all.className.length - 4);
            }
            setThemeSrc(lightTheme);
        } else if (changeTo == "dark") {
            if (all.className[all.className.length - 1] == " ") {
                all.className += "dark";
            }
            setThemeSrc(darkTheme);
        } else if (changeTo == "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                all.className += "dark";
                setThemeSrc(darkTheme);
            } else {
                if (all.className[all.className.length - 1] == "k") {
                    all.className = all.className.substring(0, all.className.length - 4);
                }
                setThemeSrc(lightTheme);
            }
        }
    }

    function showTheme(event) {
        setAnchor(anchor ? null : event.currentTarget);
    }

    function showProfile(event) {
        setAnchor2(anchor2 ? null : event.currentTarget);
    }
    const open = Boolean(anchor);
    const open2 = Boolean(anchor2);
    const id = open ? 'simple-popper' : undefined;
    const id2 = open2 ? 'simple-popper' : undefined;

    return (
        <div className="
            flex flex-row justify-between 
            w-full h-[12.5vh] bg-[#d3d3d3] dark:bg-[#27272a]"
        >
            {/* First half of nav */}
            <div className="flex justify-center items-center select-none">

                {/* Title */}
                <Link href="/" id="title" className="
                    h-full flex justify-center items-center
                    px-2.5 py-0.5 tracking-[0.25rem]
                    text-amber-500 dark:text-yellow-500 cursor-pointer"
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
                        <div key={index} className="
                            text-xl text-[#181818] dark:text-[#e6e6e6] text-center hover:text-[#505050] dark:hover:text-[#aaaaaa] hover:translate-y-1 hover:cursor-pointer
                            flex justify-center items-center h-full px-2.5 py-0.5 transition-all ease-in-out"
                        >
                            <Link href={div.href} className="tracking-widest no-underline">{div.name}</Link>
                        </div>
                    ))
                }
            
            </div>
            
            {/* Second half of nav */}
            <div className="flex justify-center items-center select-none">

                {/* Theme */}
                <div>
                    <Image src={themeSrc} alt="theme" draggable={false} className="h-full stroke-[#f8few8] hover:cursor-pointer" onClick={showTheme}></Image>
                    <Popup id={id} open={open} anchor={anchor}>
                        <div className="
                            bg-[#f3f3f3] dark:bg-[#303030] text-[#303030] dark:text-[#f3f3f3]
                            rounded-xl border border-[#8b8a8a] w-52 h-36 select-none transition-all ease-in-out"
                        >
                            <div onClick={() => changeTheme("light")} className="
                                w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                                hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe] transition-all ease-in-out"
                            >
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 mx-1"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="fill-slate-50 stroke-slate-700 dark:stroke-slate-400 dark:fill-slate-200"></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-slate-600 dark:stroke-slate-400"></path></svg>
                                <p>Jasny</p>
                            </div>
                            
                            <div onClick={() => changeTheme("dark")} className="
                                w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                                hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe] transition-all ease-in-out"
                            >
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5"  className="w-9 h-9 mr-2"><path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" className="fill-transparent"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-slate-700 dark:fill-slate-400"></path><path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" className="fill-slate-700 dark:fill-slate-400"></path></svg>
                                <p>Ciemny</p>
                            </div>

                            <div onClick={() => changeTheme("system")} className="
                                w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                                hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe] transition-all ease-in-out"
                            >
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5"  className="w-9 h-9 mr-2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" strokeWidth="2" strokeLinejoin="round" className="stroke-slate-700 dark:stroke-slate-400"></path><path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-slate-700 dark:stroke-slate-400"></path></svg>
                                <p>Systemowy</p>
                            </div>
                        </div>
                    </Popup>
                </div>
                
                

                {isLoggedIn == null ? "Loading..." : isLoggedIn ?
                <>
                { /* Coins */ }
                <div className="
                    h-full px-2.5 py-0.5 
                    flex justify-center items-center gap-5 
                    text-[#181818] dark:text-[#f7f7f7] font-title"
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
                            bg-[#f3f3f3] dark:bg-[#303030] text-[#303030] dark:text-[#f3f3f3]
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