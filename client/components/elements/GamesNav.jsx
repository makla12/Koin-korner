import Link from "next/link";

function GamesNav() {
    return (
    <div className="
        w-full h-32 flex justify-center items-center  
        bg-[#d3d3d3] dark:bg-[#27272a] rounded-full"
    >
        {[
            {name: "Ruletka", href: "/roulette"},
            {name: "Crash", href: "/crash"},
            {name: "Dice", href: "/WIP"},
            {name: "Tower", href: "/WIP"}
        ]
        .map((div, index) => (
            <Link key={index} href={div.href} className="
                text-[#181818] text-2xl w-1/5 h-[70%]  flex justify-center items-center 
                bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 hover:text-[1.6rem] select-none
                p-1.5 rounded-full mx-2 transition-all ease-in-out"
            >
                <h2>{div.name}</h2>
            </Link>
        ))}
    </div>
    );
}

export { GamesNav }