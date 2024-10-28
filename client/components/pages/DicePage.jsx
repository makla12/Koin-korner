import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Dice } from '@/components/games/Dice'

function DicePage() {
  	return (
	<>
		<MainNav/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Dice />
			</GameContainer>
		</div>
	</>
  	);
}

export { DicePage };