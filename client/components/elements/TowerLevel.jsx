import Image from 'next/image';
import koinPic from '@/public/koin.svg';
import bombPic from '@/public/red-bomb.svg';

function TowerLevel({ multiplier, difficulty, clicked }) {
    return (
    <div className="w-full h-[9.5%] my-1 flex justify-between items-center" onClick={clicked}>
		<p className="w-1/12 font-bold text-lg text-white select-none">{multiplier}</p>
			
		<div className="w-full h-full flex justify-center items-center">
			{
				difficulty == 2 ?
				<>
					<div className="w-1/3 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"></div>
					<div className="w-1/3 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"></div>
				</>
				:
				<>
					<div className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"></div> 
					<div className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"></div> 
					<div className="w-1/4 mx-[2.5%] h-full bg-[#272727] rounded-full hover:bg-[#323232] hover:cursor-pointer flex items-center justify-center"></div> 
				</>
			}
		</div>
	</div>
    );
}

export { TowerLevel };