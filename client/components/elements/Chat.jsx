import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { ChatMessage } from "./ChatMessage";
import axios from "axios";

function Chat() {
    const [messages,setMessages] = useState(null);
    const [chatSocket, setChatSocket] = useState(null);
    const messagesEndRef = useRef(null);

    //Get chat data and connect socket
    useEffect(()=>{
        const fechData = async () => {
            const data = await axios.get("http://" + window.location.hostname + ":8080/app/chatHistory");
            setMessages(data.data.messages);
        }
        fechData();
        setChatSocket(io(window.location.hostname + ":8080/chatNS", {withCredentials: true}));
    },[]);

    //Declare socket events
    useEffect(()=>{
        if(chatSocket == undefined){
            return ;
        }
        chatSocket.on("message", (messageInfo) => {
            let newMessages = Array.from(messages);
            newMessages.push(messageInfo);
            if(newMessages.length > 50) newMessages.splice(0, 1);
            setMessages(newMessages);
        });

        scrollToBottom();
        return ()=>{
            chatSocket.off("message");
        }
    },[messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant'});
    }

    return (
        <div id="chatDiv" className="
            w-[20%] min-w-[20%] h-full flex flex-col justify-between items-center 
            rounded-xl bg-[#27272a]"
        >
            {/* Chat */}
            <div className="
                h-full w-11/12 flex flex-col justify-start gap-5
                py-3 px-0.5 overflow-y-auto"
            >
                {messages == null ? "Loading..." :
                messages.map((value, index)=>(
                    <ChatMessage key={index} {...value} />
                ))}

                <div ref={messagesEndRef}></div>
            </div>
            
            {/* Sending message input */}
            {chatSocket == null ? "Loading..." :
            <form className="flex justify-center items-center w-full p-1"
                onSubmit={(e)=>{
                    e.preventDefault();
                    const messageInput = document.getElementById("messageInput");
                    if(messageInput.value == "" || messageInput.value == undefined){ //Check if input is valid
                        return ;
                    }
                    chatSocket.emit("sendMessage", messageInput.value); //Send message
                    messageInput.value = "";
                }}
            >
                <input type="text" id="messageInput" className="
                    w-10/12 h-full rounded-lg mr-1 p-2
                    text-base bg-[#a0a1a3] dark:bg-[#5d6066]"
                />

                <input type="submit" 
                className="
                    w-[15%] h-full p-0.5 rounded-lg flex justify-center items-center
                    text-4xl text-[#252525] bg-[#dba134] hover:bg-[#dbb446]
                    hover:cursor-pointer select-none"
                value={">"}
                />
            </form>
            }
        </div>
    );
}

export { Chat }