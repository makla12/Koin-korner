import Image from 'next/image';
import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkThemePic from '@/public/dark_theme.svg';
import lightThemePic from '@/public/light_theme.svg';
import { useState } from 'react';
import axios from 'axios';

function Menu() {
    const [imageSrc, setImageSrc] = useState(darkThemePic);

    function changeTheme() {
        const all = document.getElementById("all");
        const themeImage = document.querySelector("#theme img");
        if (all.className.slice(all.className.length - 4) == "dark") {
            all.className = all.className.substring(0, all.className.length - 4);
            themeImage.className = themeImage.className.substring(0, themeImage.className.length - 6);
            setImageSrc(lightThemePic);
        } else {
            all.className += "dark";
            themeImage.className += "invert";
            setImageSrc(darkThemePic);

        }
    }
    return (
    <>
        <div id="menu" className="flex flex-row justify-between w-full h-[12.5vh] border border-black dark:border-white">
            <div className="menuSection flex justify-center items-center select-none">
                <div id="title" className="
                h-full max-width-2/5 flex justify-center items-center
                 px-2.5 py-0.5 tracking-[0.25rem]
                 border-x border-[#181818] dark:border-[#f0f0f0]
                 text-[#c5ba57] dark:text-[#f8eb73]">
                    <h1 className="text-2xl">KOIN KORNER</h1>
                </div>
                {
                    [
                        {name: "Wpłacanie", href: "/WIP"},
                        {name: "Wypłacanie", href: "/WIP"},
                        {name: "Dowód uczciwości", href: "/ProvablyFair"}
                    ].map((div, index) => (
                        <div key={index} className="
                        text-fontColor hover:text-[#505050] dark:hover:text-[#aaaaaa] hover:cursor-pointer
                        flex justify-center items-center max-w-2/5 h-full 
                        border-x border-[#181818] dark:border-[#f0f0f0] px-2.5 py-0.5">
                            <a href={div.href} className="text-xl tracking-widest no-underline">{div.name}</a>
                        </div>
                    ))
                }
            </div>
            
            <div className="menuSection flex justify-center items-center select-none">
                <div id="theme" className="
                w-64 h-full max-width-2/5 flex justify-center items-center 
                border-x border-[#181818] dark:border-[#f0f0f0] px-2.5 py-0.5 hover:cursor-pointer" onClick={changeTheme}>
                    <Image src={imageSrc} alt="theme icon" draggable={false} className="w-auto h-full invert"/>
                </div>
                <div id="coins" className="
                    h-full flex justify-center items-center
                    text-5xl text-[#181818] dark:text-[#f7f7f7] font-title hover:text-[#505050] dark:hover:text-[#aaaaaa]
                    hover:cursor-pointer border-x border-[#181818] dark:border-[#f0f0f0] px-2.5 py-0.5"
                    onClick={async ()=>{ console.log((await axios.get("http://localhost:8080/auth/checkLogIn", {withCredentials: true})).data) }}
                >
                    <p className="h-1/2">100</p>
                    <Image src={koinPic} alt="koin" draggable={false} className="h-2/3 w-full ml-2"/>
                </div>
                <div id="profile" className="h-full border-0 hover:text-[#aaaaaa] hover:cursor-pointer border-x border-[#f0f0f0] px-2.5 py-0.5" 
                    onClick={()=>{
                        axios.post("http://localhost:8080/auth/logIn", 
                            {"username":"kala", "password":"123"}, 
                            {
                                withCredentials: true
                            })
                    }}
                >
                    <Image src={profilePic} alt="profile pic" draggable={false} className="w-full h-full rounded-full"/>
                </div>
            </div>
        </div>
    </>);
}


export { Menu };