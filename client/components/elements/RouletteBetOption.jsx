function RouletteBetOption({ text, className }){
    return(
    <>
        <div className={`
            w-auto h-full px-[2%] border-2 flex justify-center
            items-center text-[1vw] rounded-xl select-none 
            transition-transform duration-100 hover:cursor-pointer hover:scale-95 ${className}`}
        >
            {text}
        </div>
    </>
    );
}

export { RouletteBetOption }