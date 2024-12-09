function RouletteBetOption({ text, value, className, disabled, clicked}){
    return(
    <>
        <div onClick={()=>{if(!disabled) clicked(value)}} className={`
            w-auto h-full border-2 flex justify-center
            items-center text-[1vw] rounded-xl select-none 
            transition-transform duration-100 ${(disabled ? "" : "hover:cursor-pointer hover:scale-95")} ${className}`}
        >
            {text}
        </div>
    </>
    );
}

export { RouletteBetOption }