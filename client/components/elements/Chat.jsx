import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
import axios from "axios";

function Chat() {
    const [messages,setMessages] = useState(undefined);
    const [socket, setSocket] = useState(undefined);

    //Get chat data and connect socket
    useEffect(()=>{
        const fechData = async () => {
            const data = await axios.get("http://" + window.location.hostname + ":8080/app/chatHistory");
            setMessages(data.data.messages);
        }
        fechData();
        setSocket(io(window.location.hostname + ":8080/chatNS", {withCredentials: true}));
    },[]);

    //Declare socket events
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
        <div id="chatDiv" className="
            w-[20%] min-w-[20%] h-full flex flex-col justify-between items-center 
            rounded-xl bg-[#d3d3d3] dark:bg-[#27272a]"
        >
            {/* Room selector */}
            <div className="w-full flex justify-center items-center">
                <select id="roomSelect" className="
                    bg-[#a0a1a3] dark:bg-zinc-500 text-[#181818] text-center text-lg
                    w-[90%] p-2 mt-2 rounded-full
                    hover:cursor-pointer"
                >
                    <option value={0}>Polski</option>
                    <option value={1}>Angielski</option>
                    <option value={2}>Hiszpański</option>
                </select>
            </div>

            {/* Chat */}
            <div className="
                h-full w-11/12 flex flex-col justify-start gap-5
                py-3 px-0.5 overflow-y-auto"
            >
                {messages == undefined ? "Loading..." :
                messages.map((value, index)=>(
                    <ChatMessage key={index} {...value} />
                ))}
            </div>
            
            {/* Sending message input */}
            {socket == undefined ? "Loading..." :
            <div className="flex justify-center items-center w-full p-1">
                <input type="text" id="messageInput" className="
                    w-10/12 h-full rounded-lg mr-1 p-2
                    text-base bg-[#a0a1a3] dark:bg-[#5d6066]"
                />

                <button onClick={()=>{
                    const messageInput = document.getElementById("messageInput");
                    if(messageInput.value == "" || messageInput.value == undefined){ //Check if input is valid
                        return ;
                    }
                    socket.emit("sendMessage", messageInput.value); //Send message
                    messageInput.value = "";
                }} 
                className="
                    w-[15%] h-full p-0.5 rounded-lg flex justify-center items-center
                    text-4xl text-[#252525] bg-[#dba134] hover:bg-[#dbb446]
                    hover:cursor-pointer select-none"
                >&gt;</button>
            </div>
            }
        </div>
    );
}

export { Chat }