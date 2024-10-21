function Nav() {
    return (
    <div id="nav" className="w-full h-[9%] flex justify-center items-center border border-normalMenu">
         {
            [
               {name: "Ruletka"},
               {name: "Crash"},
               {name: "Dice"},
               {name: "Tower"}
            ].map(div => (
                <div className="
                    border p-1.5 text-xl w-[10%] h-full flex justify-center items-center 
                    bg-[#bbb074] hover:cursor-pointer hover:bg-[#a3995d]"
                >
                    <h2>{div.name}</h2>
                </div>
            ))
         }
    </div>);
}

export { Nav }