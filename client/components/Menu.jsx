import Image from 'next/image';
import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkThemePic from '@/public/dark_theme.png';

function Menu() {

    function changeTheme() {
        const all = document.getElementById("all");
        all.className = all.className == "dark" ? "light" : "dark"
    }
    return (
    <>
        <div id="menu" className="flex flex-row flex justify-between w-full h-[12.5vh] border">
            <div className="menuSection flex justify-center items-center select-none">
                <div id="title" className="h-full max-width-2/5 flex justify-center items-center border-x border-[#f0f0f0] px-2.5 py-0.5 tracking-[0.25rem]">
                    <h1 className="text-2xl">KOIN KORNER</h1>
                </div>
                {
                    [
                        {name: "Wpłacanie", href: "/WIP"},
                        {name: "Wypłacanie", href: "/WIP"},
                        {name: "Dowód uczciwości", href: "/ProvablyFair"}
                    ].map(div => (
                        <div className="text-fontColor hover:text-[#aaaaaa] hover:cursor-pointer
                        flex justify-center items-center max-w-2/5 h-full border-x border-[#f0f0f0] px-2.5 py-0.5">
                            <a href={div.href} className="text-xl tracking-widest no-underline hover:text-[#aaaaaa]">{div.name}</a>
                        </div>
                    ))
                }
            </div>
            
            <div className="menuSection flex justify-center items-center select-none">
                <div id="theme" className="h-full max-width-2/5 flex justify-center items-center border-x border-[#f0f0f0] px-2.5 py-0.5 hover:cursor-pointer" onClick={changeTheme}>
                    {/* <Image src={darkThemePic} alt="theme icon" draggable={false} style={{
                        height: '100%',
                        width: '100%'
                    }}/> */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                </div>
                <div id="coins" className="h-full flex justify-center items-center text-5xl text-[#f7f7f7] font-title hover:text-[#aaaaaa] hover:cursor-pointer border-x border-[#f0f0f0] px-2.5 py-0.5">
                    <p className="h-1/2">100</p>
                    <Image src={koinPic} alt="koin" draggable={false} style={{
                        height: '66.67%',
                        width: '100%',
                        marginLeft: '0.375rem',
                    }}/>
                </div>
                <div id="profile" className="h-full border-0 hover:text-[#aaaaaa] hover:cursor-pointer border-x border-[#f0f0f0] px-2.5 py-0.5">
                    <Image src={profilePic} alt="profile pic" draggable={false} style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '9999px',
                    }}/>
                </div>
            </div>
        </div>
    </>);
}


export { Menu };