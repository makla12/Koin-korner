function GamesNav() {
    return (
    <div className="
        w-full h-[12.5%] flex justify-center items-center  
        bg-[#d3d3d3] dark:bg-[#27272a] rounded-full"
    >
        {[
            {name: "Ruletka", href: "/roulette"},
            {name: "Crash", href: "/crash"},
            {name: "Dice", href: "/dice"},
            {name: "Tower", href: "/tower"}
        ]
        .map((div, index) => (
            <a key={index} href={div.href} className="
                text-[#181818] text-2xl w-1/5 h-[70%]  flex justify-center items-center 
                bg-yellow-500 hover:cursor-pointer hover:bg-yellow-400 hover:text-[1.6rem] select-none
                p-1.5 rounded-full mx-2 transition-all ease-in-out"
            >
                <h2>{div.name}</h2>
            </a>
        ))}
    </div>
    );
}

export { GamesNav }