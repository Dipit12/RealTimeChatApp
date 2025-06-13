import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [roomID, setRoomID] = useState("");
    const nav = useNavigate();

    function generateRoomCode() {
        const newRoomID = Math.floor(Math.random() * 10000000).toString();
        alert(`Here is your room code: ${newRoomID}`);
        localStorage.setItem("roomID", newRoomID);
        nav("/chat");
    }

    function joinRoom() {
        if (roomID) {
            localStorage.setItem("roomID", roomID);
            nav("/chat");
        } else {
            alert("Enter a valid Room ID!");
        }
    }

    return (
        <div className="p-4">
            <button className="m-2 p-2 bg-green-500 text-white" onClick={generateRoomCode}>
                Create a Room
            </button>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    className="p-2 border rounded mr-2"
                    onChange={(e) => setRoomID(e.target.value)}
                />
                <button className="p-2 bg-blue-500 text-white" onClick={joinRoom}>
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Home;
