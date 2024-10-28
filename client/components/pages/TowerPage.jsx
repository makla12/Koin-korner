import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Tower } from '@/components/games/Tower.jsx'

function TowerPage() {
  	return (
    <>
      	<MainNav/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Tower />
			</GameContainer>
		</div>
    </>
  	);
}

export { TowerPage };