import Image from 'next/image';

import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkThemePic from '@/public/dark_theme.png';

function Menu() {
    return (
    <>
        <div id="menu" className="flex flex-row flex justify-between w-full border">
            <div className="menuSection flex justify-center items-center">
                <div id="title">
                    <h1 className='text-2xl'>KOIN KORNER</h1>
                </div>
                <div>
                    <a href="">
                        <h3>Wpłacanie</h3>
                    </a>
                </div>
                <div>
                    <a href="">
                        <h3>Wypłacanie</h3>
                    </a>
                </div>
                <div>
                    <a href="">
                        <h3>Dowód sprawiedliwości</h3>
                    </a>
                </div>
            </div>
            
            <div className="menuSection flex justify-center items-center">
                <div id="theme">
                    <Image src={darkThemePic} alt="theme icon" style={{
                        height: '100%',
                        width: '100%'
                    }}/>
                </div>
                <div id="coins" className="flex justify-center items-center text-5xl">
                    <p className="h-1/2">100</p>
                    <Image src={koinPic} alt="koin" style={{
                        height: '66.67%',
                        width: '100%',
                        marginLeft: '0.375rem',
                    }}/>
                </div>
                <div id="profile">
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