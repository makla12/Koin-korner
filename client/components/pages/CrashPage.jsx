import { MainNav } from '@/components/elements/MainNav';
import { Chat } from '@/components/elements/Chat';
import { GameContainer } from '@/components/elements/GameContainer';
import { Crash } from '@/components/games/Crash'

function CrashPage() {
  return (
    <>
		<MainNav/>
		<div className="flex justify-between items-center p-5 h-[87.5vh]">
			<Chat />
			<GameContainer> 
				<Crash />
			</GameContainer>
		</div>
    </>
  );
}

export { CrashPage };