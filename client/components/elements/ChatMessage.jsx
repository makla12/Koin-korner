function ChatMessage({user, time, message}) {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex justify-start h-5 gap-2">
                <p className="font-bold text-[#181818] dark:text-[#e6e6e6]">{user}</p>
                <p className="text-[#323232] dark:text-[#b9b9b9]">{time}</p>
            </div>
            
            <div className="text-[#181818] dark:text-[#e6e6e6]">
                <p>{message}</p>
            </div>
        </div>
    );
  }
  
  export { ChatMessage };