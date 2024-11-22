function TowerLevel({ multiplier }) {
    return (
    <div className="w-full h-[9.5%] my-1 flex justify-between items-center">
		<p className="w-1/12 font-bold text-lg text-white select-none">{multiplier}</p>
					
		<div className="w-full h-full flex justify-around items-center">
			<div className="w-1/4 h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer"></div>
			<div className="w-1/4 h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer"></div>
			<div className="w-1/4 h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer"></div>
		</div>
	</div>
    );
}

export { TowerLevel };