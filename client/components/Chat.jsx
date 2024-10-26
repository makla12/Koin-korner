function Chat() {
    return (
    <>
        <div id="chatContainer" className="
        w-1/4 h-full flex flex-col justify-between items-center 
        rounded-xl bg-[#d3d3d3] dark:bg-[#404040]">
            <div id="room" className="w-full flex justify-center items-center">
                <select id="roomSelect" className="
                bg-[#a0a1a3] dark:bg-[#aaabad] text-[#181818] text-center text-lg
                w-[90%] p-2 mt-2 rounded-full
                hover:cursor-pointer hover:bg-[#8d8f91] dark:hover:bg-[#b6b7ba]">
                    <option selected>Polska</option>
                    <option selected>USA</option>
                    <option selected>Japonia</option>
                </select>
            </div>
            <div id="chat" className="
            h-full w-11/12 flex flex-col justify-start
             py-3 px-0.5 overflow-y-auto">
                <div className="chatMessage w-full flex flex-col justify-center">
                    <div className="chatMessageHeader flex justify-start h-5 gap-2">
                        <p className="chatMessageUsername font-bold text-[#181818] dark:text-[#e6e6e6]">Maciej Sieńko</p>
                        <p className="chatMessageTime text-[#323232] dark:text-[#b9b9b9]">13:49</p>
                    </div>
                    <div className="chatMessageContent text-[#181818] dark:text-[#e6e6e6]">
                        <p className="chatMessageText">Polecam hazard</p>
                    </div>
                </div>
            </div>
            <div id="chatSendMessageContainer" className="flex justify-center items-center w-full p-1">
                <input type="text" id="messageInput" className="
                w-10/12 h-full rounded-lg mr-1 p-1
                text-base bg-[#a0a1a3] dark:bg-[#5d6066]"/>
                <button type="submit" id="sendMessage" className="
                w-[15%] h-full p-0.5 rounded-lg flex justify-center items-center
                text-4xl text-[#252525] bg-[#dcc43c] hover:bg-[#bdac4f]
                hover:cursor-pointer select-none">&gt;</button>
            </div>
        </div>
    </>);
}

export { Chat }