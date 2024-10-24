function Nav() {
    return (
    <div id="nav" className="w-full h-[9%] flex justify-center items-center border border-normalMenu">
         {
            [
               {name: "Ruletka", href: "/Roulette"},
               {name: "Crash", href: "/Crash"},
               {name: "Dice", href: "/Dice"},
               {name: "Tower", href: "/Tower"}
            ].map(div => (
                <a className="
                    border p-1.5 text-xl w-[10%] h-full flex justify-center items-center 
                    bg-[#bbb074] hover:cursor-pointer hover:bg-[#a3995d] select-none"
                    href={div.href}
                >
                    <h2>{div.name}</h2>
                </a>
            ))
         }
    </div>);
}

export { Nav }