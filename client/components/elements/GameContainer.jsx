import { GamesNav } from './GamesNav'

function GameContainer({ children }) {
    return (
        <div className="w-full h-full ml-5 rounded-lg flex flex-col justify-start items-center">
            <GamesNav />
            
            <div className="w-full min-h-[85%] mt-5 rounded-2xl bg-[#d3d3d3] dark:bg-[#404040]">
                {children}
            </div>
        </div>
    );
}

export { GameContainer };