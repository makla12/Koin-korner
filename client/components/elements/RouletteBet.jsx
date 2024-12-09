function RouletteBet({name, bet, choice, type, self}){

    return(
    <>
        <div className="flex justify-between items-center h-10">
            <p className={(self ? "text-green-400 font-bold" : null)}>{name}</p>
            <div className="flex items-center gap-1">
                <p className="font-bold text-lg">{bet}</p>
                <div className={`min-w-4 w-auto h-8 border-2 ${(type == 0 ? "bg-red-600 border-red-800" : (type == 1 ? "bg-yellow-600 border-yellow-800" : "bg-gray-900 border-gray-950"))} flex justify-center items-center rounded-lg`}>
                    {(choice == "RED" || choice == "BLACK" ? "" : (choice == "EVEN" ? "E" : (choice == "ODD" ? "O" : choice)))}
                </div>
            </div>
        </div>
    </>
    );
}

export { RouletteBet }