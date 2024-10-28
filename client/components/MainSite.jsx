import { Nav } from './Nav.jsx'
import { Game } from './Game.jsx'

function MainSite() {
    return (
    <div id="mainSite" className="w-full h-full ml-5 rounded-lg flex flex-col justify-start items-center">
        <Nav/>
        <Game/>
    </div>);
}

export { MainSite };