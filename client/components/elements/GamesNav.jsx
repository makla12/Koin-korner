function GamesNav() {
    return (
    <div className="
        w-full h-[12.5%] flex justify-center items-center  
        bg-[#d3d3d3] dark:bg-[#27272a] rounded-full"
    >
        {[
            {name: "Ruletka", href: "/Roulette"},
            {name: "Crash", href: "/Crash"},
            {name: "Dice", href: "/Dice"},
            {name: "Tower", href: "/Tower"}
        ]
        .map((div, index) => (
            <a key={index} href={div.href} className="
                text-[#181818] text-2xl w-1/5 h-[70%]  flex justify-center items-center 
                bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 select-none
                p-1.5 rounded-full mx-2"
            >
                <h2>{div.name}</h2>
            </a>
        ))}
    </div>
    );
}

export { GamesNav }