import { MainNav } from '@/components/elements/MainNav';
import { GameContainer } from '@/components/elements/GameContainer';

function DefaultPage() {
    return (
    <>
        <MainNav/>
        <div className="flex justify-between items-center p-5 h-[87.5vh]">
            <GameContainer>
                <div>DefaultPage (tutaj będzie coś o stronie)</div>
            </GameContainer>
        </div>
    </>
    );
}

export { DefaultPage };