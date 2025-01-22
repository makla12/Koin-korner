function CrashBet({name, cashOut, bet, self}){

    return(
    <>
        <div className="w-full flex justify-around items-center my-[0.5%]">
            <p className={`w-1/2 text-center ${self ? "text-green-500 font-bold" : ""}`}>{name}</p>
            <p className="w-[15%] text-center">{cashOut != 0 ? `x${cashOut.toFixed(2)}` : "-"}</p>
            <p className="w-[15%] text-center">{bet}</p>
            <p className="w-[15%] text-center">{cashOut != 0 ? (bet * cashOut).toFixed(0) : "-"}</p>
        </div>
    </>
    );
}

export { CrashBet }