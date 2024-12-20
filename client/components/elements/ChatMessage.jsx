function ChatMessage({username, date, message}) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const time = dateObj.toTimeString().substring(0,8);
    const dateSting = `${year}-${month < 10 ? "0" : ""}${month}-${day} ${time}`;
    
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex justify-start h-5 gap-2">
                <p className="font-bold text-[#e6e6e6]">{username}</p>
                <p className="text-[#b9b9b9]">{dateSting}</p>
            </div>
            
            <div className="text-[#e6e6e6]">
                <p>{message}</p>
            </div>
        </div>
    );
  }
  
  export { ChatMessage };