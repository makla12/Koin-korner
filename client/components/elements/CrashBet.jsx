function CrashBet({name, cashOut, bet}){

    return(
    <>
        <div className="w-full flex justify-around items-center my-[0.5%]">
            <p className="w-1/2 text-center">{name}</p>
            <p className="w-[15%] text-center">{cashOut != 0 ? cashOut.toFixed(2) : "-"}</p>
            <p className="w-[15%] text-center">{bet}</p>
            <p className="w-[15%] text-center">{cashOut != 0 ? bet * cashOut : "-"}</p>
        </div>
    </>
    );
}

export { CrashBet }