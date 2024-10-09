import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function Chat() {
    useEffect(()=>{
        const chatSocket = io("127.0.0.1:8080/chatNS");
    },[]);
    return (
    <>
        <div id="chatContainer">
            <div id="chat">
                <div className="chatMessage">
                    <div className="chatMessageHeader">
                        <p className="chatMessageUsername">Maciej Sieńko</p>
                        <p className="chatMessageTime">13:49</p>
                    </div>
                    <div className="chatMessageContent">
                        <p className="chatMessageText">Polecam hazard</p>
                    </div>
                </div>
            </div>
            <div id="chatSendMessageContainer">
                <input type="text" id="messageInput"/>
                <button type="submit" id="sendMessage">⊳</button>
            </div>
        </div>
    </>);
}

export { Chat }