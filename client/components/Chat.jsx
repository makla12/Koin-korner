import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
import axios from "axios";

function Chat() {
    const [messages,setMessages] = useState(undefined);
    const [socket, setSocket] = useState(undefined);
    useEffect(()=>{
        const fechData = async () => {
            const data = await axios.get("http://localhost:8080/app/chatHistory");
            setMessages(data.data.messages);
        }
        fechData();
        setSocket(io("http://localhost:8080/chatNS", {withCredentials: true}));
    },[]);

    useEffect(()=>{
        if(socket == undefined){
            return ;
        }

        socket.on("message", (messageInfo) => {
            let newMessages = Array.from(messages);
            newMessages.push(messageInfo);
            setMessages(newMessages);
        });

        return ()=>{
            socket.off("message");
        }
    },[messages])

    return (
    <div id="chatContainer" className="
        w-1/4 h-full flex flex-col justify-between items-center 
        rounded-xl bg-[#d3d3d3] dark:bg-[#404040]"
    >
        <div id="room" className="w-full flex justify-center items-center">
            <select id="roomSelect" className="
                bg-[#a0a1a3] dark:bg-[#aaabad] text-[#181818] text-center text-lg
                w-[90%] p-2 mt-2 rounded-full
                hover:cursor-pointer hover:bg-[#8d8f91] dark:hover:bg-[#b6b7ba]"
            >
                <option value={"polska"}>Polska</option>
                <option value={"usa"}>USA</option>
                <option value={"japonia"}>Japonia</option>
            </select>
        </div>

        <div id="chat" className="
            h-full w-11/12 flex flex-col justify-start
            py-3 px-0.5 overflow-y-auto"
        >
            {messages == undefined ? "Loading..." :
            messages.map((value, index)=>(
                <ChatMessage key={index} {...value} />
            ))}
        </div>
        
        {socket == undefined ? "Loading..." :
        <div id="chatSendMessageContainer" className="flex justify-center items-center w-full p-1">
            <input type="text" id="messageInput" className="
                w-10/12 h-full rounded-lg mr-1 p-1
                text-base bg-[#a0a1a3] dark:bg-[#5d6066]"
            />
            <button onClick={()=>{
                const messageInput = document.getElementById("messageInput");
                if(messageInput.value == "" || messageInput.value == undefined){
                    return ;
                }
                socket.emit("sendMessage", messageInput.value);
            }} 
            className="
                w-[15%] h-full p-0.5 rounded-lg flex justify-center items-center
                text-4xl text-[#252525] bg-[#dcc43c] hover:bg-[#bdac4f]
                hover:cursor-pointer select-none"
            >&gt;</button>
        </div>
        }
    </div>
    );
}

export { Chat }