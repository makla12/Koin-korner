import Image from 'next/image';

import profilePic from '@/public/profile_pic.svg';
import koinPic from '@/public/koin.svg';
import darkThemePic from '@/public/dark_theme.png';

function Menu() {
    return (
    <>
        <div id="menu">
            <div className="menuSection">
                <div id="title">
                    <h1>KOIN KORNER</h1>
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
            
            <div className="menuSection">
                <div id="theme">
                    <Image src={darkThemePic} alt="theme icon" style={{
                        height: '100%'
                    }}/>
                </div>
                <div id="coins">
                    <p>100</p>
                    <Image src={koinPic} alt="koin" style={{
                        height: '66.67%',
                        marginLeft: '0.375rem',
                    }}/>
                </div>
                <div id="profile">
                    <Image src={profilePic} alt="profile pic" style={{
                        height: '100%',
                        borderRadius: '100%',
                    }}/>
                </div>
            </div>
        </div>
    </>);
}

export { Menu };