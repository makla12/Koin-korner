function ChatMessage({user, time, message}) {
    return (
        <div className="chatMessage w-full flex flex-col justify-center">
            <div className="chatMessageHeader flex justify-start h-5 gap-2">
                <p className="chatMessageUsername font-bold text-[#181818] dark:text-[#e6e6e6]">{user}</p>
                <p className="chatMessageTime text-[#323232] dark:text-[#b9b9b9]">{time}</p>
            </div>
            <div className="chatMessageContent text-[#181818] dark:text-[#e6e6e6]">
                <p className="chatMessageText">{message}</p>
            </div>
        </div>
    );
  }
  
  export { ChatMessage };