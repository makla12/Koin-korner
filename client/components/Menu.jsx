import Image from 'next/image';
import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkTheme from '@/public/dark_theme.svg';
import lightTheme from '@/public/light_theme.svg';
import { Unstable_Popup as Popup } from '@mui/base';
import { useState } from 'react';

function Menu() {
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
    <>
        <div id="menu" className="flex flex-row justify-between 
        w-full h-[12.5vh] border-b border-black dark:border-white
        bg-[#d3d3d3] dark:bg-[#404040]">
            <div className="menuSection flex justify-center items-center select-none">
                <div id="title" className="
                h-full flex justify-center items-center
                 px-2.5 py-0.5 tracking-[0.25rem]
                 text-[#d0b835] dark:text-[#e6d750]">
                    <h1 className="text-2xl text-center">KOIN KORNER</h1>
                </div>
                {
                    [
                        {name: "Wpłacanie", href: "/WIP"},
                        {name: "Wypłacanie", href: "/WIP"},
                        {name: "Dowód uczciwości", href: "/ProvablyFair"}
                    ].map((div, index) => (
                        <div key={index} className="
                        text-[#181818] dark:text-[#e6e6e6] text-center hover:text-[#505050] dark:hover:text-[#aaaaaa] hover:cursor-pointer
                        flex justify-center items-center h-full
                        px-2.5 py-0.5">
                            <a href={div.href} className="text-xl tracking-widest no-underline">{div.name}</a>
                        </div>
                    ))
                }
            </div>
            
            <div className="menuSection flex justify-center items-center select-none">
                <div id="theme">
                    <Image src={themeSrc} alt="theme" draggable={false} className="h-full stroke-[#f8few8] hover:cursor-pointer" onClick={showTheme}></Image>
                    <Popup id={id} open={open} anchor={anchor}>
                        <div className="
                        bg-[#f3f3f3] dark:bg-[#303030] text-[#303030] dark:text-[#f3f3f3]
                        rounded-xl border border-[#8b8a8a] w-52 h-36 select-none">
                            <div className="
                            w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                            hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe]"
                            onClick={() => changeTheme("light")}>
                                <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-9 h-9 mx-1"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="fill-slate-50 stroke-slate-700 dark:stroke-slate-400 dark:fill-slate-200"></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" class="stroke-slate-600 dark:stroke-slate-400"></path></svg>
                                <p>Jasny</p>
                            </div>

                            <div className="
                            w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                            hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe]"
                            onClick={() => changeTheme("dark")}>
                                <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"  class="w-9 h-9 mr-2"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-transparent"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-slate-700 dark:fill-slate-400"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-slate-700 dark:fill-slate-400"></path></svg>
                                <p>Ciemny</p>
                            </div>

                            <div className="
                            w-full h-1/3 flex items-center text-md font-bold p-1 rounded-xl
                            hover:cursor-pointer dark:hover:bg-[#4a4a4a] hover:bg-[#bebebe]"
                            onClick={() => changeTheme("system")}>
                                <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"  class="w-9 h-9 mr-2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke-width="2" stroke-linejoin="round" class="stroke-slate-700 dark:stroke-slate-400"></path><path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-slate-700 dark:stroke-slate-400"></path></svg>
                                <p>Systemowy</p>
                            </div>
                        </div>
                    </Popup>
                </div>
                <div id="coins" className="
                    h-full flex justify-center items-center
                    text-[#181818] dark:text-[#f7f7f7] font-title hover:text-[#505050] dark:hover:text-[#aaaaaa]
                    hover:cursor-pointer px-2.5 py-0.5"
                >
                    <p className="h-1/2 text-5xl text-center flex justify-center items-center">100</p>
                    <Image src={koinPic} alt="koin" draggable={false} className="h-2/3 w-full ml-2"/>
                </div>
                <div id="profile" className="
                h-full hover:text-[#aaaaaa] hover:cursor-pointer
                px-2.5 py-0.5
                flex justify-center items-center">
                    <Image src={profilePic} alt="profile pic" draggable={false} className="w-full h-5/6 rounded-full" onClick={showProfile}/>
                    <Popup id={id2} open={open2} anchor={anchor2}>
                        <div className="
                            bg-[#f3f3f3] dark:bg-[#303030] text-[#303030] dark:text-[#f3f3f3]
                            rounded-xl border border-[#8b8a8a] w-64 h-24 select-none">
                            <a href="/login" className="w-full h-1/2 flex justify-center items-center 
                            text-lg text-center text-[#242424] dark:text-[#f3f3f3] bg-[#c3c3c3] dark:bg-[#696969]">Zarejestruj</a>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    </>);
}

export { Menu };