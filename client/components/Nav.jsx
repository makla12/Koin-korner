function Nav() {
    return (
    <div id="nav" className="
    w-full h-[12.5%] flex justify-center items-center 
    bg-[#d3d3d3] dark:bg-[#404040] rounded-full">
         {
            [
               {name: "Ruletka", href: "/Roulette"},
               {name: "Crash", href: "/Crash"},
               {name: "Dice", href: "/Dice"},
               {name: "Tower", href: "/Tower"}
            ].map((div, index) => (
                <a key={index}className="
                    text-[#181818] text-xl w-1/5 h-4/5  flex justify-center items-center 
                    bg-[#cfb93d] hover:cursor-pointer hover:bg-[#e0cb58] select-none
                    p-1.5 rounded-full mx-2"
                    href={div.href}
                >
                    <h2>{div.name}</h2>
                </a>
            ))
         }
    </div>);
}

export { Nav }