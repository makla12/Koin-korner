import Image from 'next/image';
import koinPic from '@/public/koin.svg';
import bombPic from '@/public/red-bomb.svg';

function TowerLevel({ multiplier, difficulty, clicked, id, bombPlace, currentLevel }) {
    return (
    <div id={`level${10 - id}`} className="w-full h-[9.5%] my-1 flex justify-between items-center select-none">
		<p className="w-1/12 font-bold text-lg text-white">{multiplier}</p>
			
		<div className="w-full h-full flex justify-center items-center">
			{
				difficulty == 2 ?
				<>
					<div id="towerClick1" className="w-1/3 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"  onClick={clicked}></div>
					<div id="towerClick2" className="w-1/3 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"  onClick={clicked}></div>
				</>
				:
				<>
					<div id="towerClick1" className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"  onClick={clicked}></div> 
					<div id="towerClick2" className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"  onClick={clicked}></div> 
					<div id="towerClick3" className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"  onClick={clicked}></div> 
				</>
			}
		</div>
	</div>
    );
}

export { TowerLevel };