import { Chat } from './Chat.jsx'
import { MainSite } from './MainSite.jsx'

function Site() {
    return (
    <div id="site" className="flex justify-between items-center p-5">
        <Chat/>
        <MainSite/>
    </div>);
}

export { Site };