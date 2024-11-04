function Roulette() {
  	return (
    <>
		<div className="flex justify-start items-center rounded-lg overflow-hidden w-full relative">
			<div id="resultLine" className="w-3 h-40 relative bg-white left-1/2"></div>
			{
				[
					{color: "yellow-500", number: "K"},
					{color: "red-600", number: "1"},
					{color: "zinc-950", number: "8"},
					{color: "red-600", number: "2"},
					{color: "zinc-950", number: "9"},
					{color: "red-600", number: "3"},
					{color: "zinc-950", number: "10"},
					{color: "red-600", number: "4"},
					{color: "zinc-950", number: "11"},
					{color: "red-600", number: "5"},
					{color: "zinc-950", number: "12"},
					{color: "red-600", number: "6"},
					{color: "zinc-950", number: "13"},
					{color: "red-600", number: "7"},
					{color: "zinc-950", number: "14"},
				].map((div, index) => (
					<div key={index} className={`
					w-32 h-32 bg-${div.color} text-3xl text-${div.number === "K" ? "[#181818]" : "[#e6e6e6]"} font-bold
					flex justify-center items-center`}
					>{div.number}</div>
				))
			}
		</div>
    </>
  	);
}

export {Roulette};
