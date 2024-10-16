import Image from 'next/image';

import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkThemePic from '@/public/dark_theme.png';

function Menu() {
    return (
    <>
        <div id="menu" className="flex flex-row flex justify-between w-full h-[12.5vh] border">
            <div className="menuSection flex justify-center items-center">
                <div id="title" className="h-full max-width-2/5 flex justify-center items-center border-x border-[#f0f0f0] px-2.5 py-0.5 tracking-[0.25rem]">
                    <h1 className='text-2xl'>KOIN KORNER</h1>
                </div>
                {
                    [
                        {name: "Wpłacanie", href: ""},
                        {name: "Wypłacanie", href: ""},
                        {name: "Dowód uczciwości", href: ""}
                    ].map(div => (
                        <div className="text-fontColor hover:text-[#aaaaaa] hover:cursor-pointer
                        flex justify-center items-center max-w-2/5 h-full border-x border-[#f0f0f0] px-2.5 py-0.5">
                            <a href={div.href} className="text-xl tracking-widest no-underline hover:text-[#aaaaaa]">{div.name}</a>
                        </div>
                    ))
                }
            </div>
            
            <div className="menuSection flex justify-center items-center">
                <div id="theme" className="h-full max-width-2/5 flex justify-center items-center border-x border-[#f0f0f0] px-2.5 py-0.5">
                    <Image src={darkThemePic} alt="theme icon" style={{
                        height: '100%',
                        width: '100%'
                    }}/>
                </div>
                <div id="coins" className="h-full flex justify-center items-center text-5xl text-[#f7f7f7] font-title hover:text-[#aaaaaa] hover:cursor-pointer border-x border-[#f0f0f0] px-2.5 py-0.5">
                    <p className="h-1/2">100</p>
                    <Image src={koinPic} alt="koin" style={{
                        height: '66.67%',
                        width: '100%',
                        marginLeft: '0.375rem',
                    }}/>
                </div>
                <div id="profile" className="h-full border-0 hover:text-[#aaaaaa] hover:cursor-pointer border-x border-[#f0f0f0] px-2.5 py-0.5">
                    <Image src={profilePic} alt="profile pic" style={{
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