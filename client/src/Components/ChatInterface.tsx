import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

const ChatInterface = () => {
    const [message, setMessage] = useState("");
    const [displayMsg, setDisplayMsg] = useState<string[]>([]);
    const [roomID, setRoomID] = useState("");

    useEffect(() => {
        const savedRoomID = localStorage.getItem("roomID");
        if (savedRoomID) {
            setRoomID(savedRoomID);
            socket.emit("join-room", savedRoomID);
        }

        socket.on("receivedMsg", (data: { roomID: string, message: string }) => {
            console.log("Received:", data);
            setDisplayMsg(prev => [...prev, data.message]); 
        });
        

        return () => {
            socket.off("receivedMsg");
        };
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!message.trim()) return;
        socket.emit("chatMessage", { roomID, message });
        setMessage("");
    }

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Chat Room: {roomID}</h1>
            <div className="bg-white h-64 w-96 p-4 shadow-md overflow-y-scroll">
                <ul>
                    {displayMsg.map((msg, idx) => (
                        <li key={idx} className="text-black mb-1">{msg}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
                <input
                    type="text"
                    placeholder="Enter your message"
                    className="bg-amber-200 text-black p-2 rounded w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
