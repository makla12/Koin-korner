import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function Chat() {
    useEffect(()=>{
        const chatSocket = io("127.0.0.1:8080/chatNS");
    },[]);
    return (
    <>
        <div id="chatContainer" className="w-1/4 h-full flex flex-col justify-between items-center border border-normalMenu rounded-xl bg-background">
            <div id="chat" className="h-full flex flex-col justify-start w-11/12 py-3 px-0.5 overflow-y-auto">
                <div className="chatMessage w-full flex flex-col justify-center">
                    <div className="chatMessageHeader flex justify-start h-5 gap-2">
                        <p className="chatMessageUsername font-bold text-[white]">Maciej Sieńko</p>
                        <p className="chatMessageTime text-[#b9b9b9]">13:49</p>
                    </div>
                    <div className="chatMessageContent text-[#e3e3e3]">
                        <p className="chatMessageText">Polecam hazard</p>
                    </div>
                </div>
            </div>
            <div id="chatSendMessageContainer" className="flex justify-center items-center w-full p-3">
                <input type="text" id="messageInput" className="border border-normalChat w-10/12 rounded-lg mr-0.5 p-1 text-base bg-[#3a3a3a] border-[#cecece]"/>
                <button type="submit" id="sendMessage" className="w-1/8 h-4/5 p-0.5 border rounded-lg flex justify-center items-center
                 text-5xl bg-[#ddce77] text-[#252525] border-[#252525] hover:bg-[#bdae5a] hover:cursor-pointer select-none">⊳</button>
            </div>
        </div>
    </>);
}

export { Chat }