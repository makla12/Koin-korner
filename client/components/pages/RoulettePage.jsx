import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Roulette } from '@/components/games/Roulette'

function RoulettePage() {
  	return (
    <>
      	<MainNav/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Roulette />
			</GameContainer>
		</div>
    </>
  	);
}

export { RoulettePage };