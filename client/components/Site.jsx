import { Chat } from './Chat.jsx'
import { MainSite } from './MainSite.jsx'

function Site() {
    return (
    <div id="site" className="flex justify-between items-center p-5 h-[82.5vh]">
        <Chat/>
        <MainSite/>
    </div>);
}

export { Site };