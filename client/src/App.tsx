import React, {useState, useEffect} from "react";
import { io } from "socket.io-client"
import ChatInterface from "./Components/chatInterface";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
  return(
    <>
        <BrowserRouter>
            <Routes>
                <Route path = "/chat" element = {<ChatInterface />} />
                <Route path = "/" element = {<Home/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}


export default App;