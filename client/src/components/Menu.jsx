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
                    <img src="./src/assets/images/dark_theme.png" alt="theme icon"/>
                </div>
                <div id="coins">
                    <p>100</p>
                    <img src="./src/assets/images/koin.svg" alt="koin"/>
                </div>
                <div id="profile">
                    <img src="./src/assets/images/profile_pic.svg" alt="profile pic"/>
                </div>
            </div>
        </div>
    </>);
}

export { Menu };