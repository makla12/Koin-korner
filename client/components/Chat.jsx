function Chat() {
    return (
    <>
        <div id="chatContainer" className="w-1/4 h-full flex flex-col justify-between items-center border border-normalMenu rounded-xl bg-background">
            <div id="chat" className="h-full flex flex-col justify-start w-11/12 py-1 px-0.5">
                <div className="chatMessage w-full flex flex-col justify-center">
                    <div className="chatMessageHeader flex justify-start h-5 gap-2">
                        <p className="chatMessageUsername  font-bold">Maciej Sieńko</p>
                        <p className="chatMessageTime">13:49</p>
                    </div>
                    <div className="chatMessageContent">
                        <p className="chatMessageText">Polecam hazard</p>
                    </div>
                </div>
            </div>
            <div id="chatSendMessageContainer" className="flex justify-center items-center w-full p-3">
                <input type="text" id="messageInput" className="border border-normalChat w-10/12 rounded-lg mr-0.5 p-1 text-base"/>
                <button type="submit" id="sendMessage" className="h-4/5 p-0.5 border rounded-lg flex justify-center items-center text-5xl">⊳</button>
            </div>
        </div>
    </>);
}

export { Chat }