import React, {useState, useEffect} from "react";
import { io } from "socket.io-client"
import ChatInterface from "./Components/chatInterface";
function App(){
  return(
    <>
        <ChatInterface/>
    </>
  )
}


export default App;