import { MainNav } from '@/components/elements/MainNav';
import { GameContainer } from '@/components/elements/GameContainer';

function DefaultPage() {
    return (
    <>
        <MainNav/>
        <div className="flex justify-between items-center p-5 h-[87.5vh]">
            <GameContainer>
                <div className="p-4 text-center">
                    <h2 className="text-2xl my-4">Koin korner to jedyna w swoim rodzaju uczciwa i wiarygodna strona hazardowa, na której to <i className="font-bold dark:text-yellow-500 text-yellow-600">TY</i> możesz wygrać fortunę!</h2>
                    <h2 className="text-2xl my-4">Na co czekasz? Zagraj <i className="dark:text-yellow-500 text-yellow-600">już teraz</i> w ruletkę, crash, dice lub tower!</h2>

                    <p className="text-lg">Opinie naszych użytkowników:</p>
                    <p className="text-lg italic my-4">"Koin korner jest moją ulubioną stroną do hazardu, gdyż na wszystkich innych, na których byłem, nie wygrałem tak dużo jak tutaj. Uważam, że jest to bardzo uczciwy zarobek, dzięki któremu zarabiam na swoją rodzinę." - Andrzej Duda</p>
                    <p className="text-lg italic my-4">"Nigdy się nie poddałem. Od 18 do 70 roku życia grałem na koin korner. Ostatecznie wygrałem nie tysiące, a miliony złotych. Nie poddawaj się, a wygrasz wiele." - Anonimowy starzec</p>
                    <p className="text-lg italic my-4">"Moje sprawdzone życiowe motto brzmi tak: koin korner - centrum świata, ruletka - ziemia, crash - woda, dice - powietrze, tower - ogień" - Diogenes</p>
                </div>
            </GameContainer>
        </div>
    </>
    );
}

export { DefaultPage };