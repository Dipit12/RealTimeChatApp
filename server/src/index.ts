import express from "express";
import {Server, Socket} from 'socket.io'
import cors from 'cors'
import {createServer} from 'http'

const app = express()
const PORT = 3000

app.use(cors())

const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"]
    }
})

app.get("/", (req, res) => {
    res.json({msg:"Server is up"})
})

io.on("connection", (socket : Socket) =>{
    console.log("User connected")

    socket.on("disconnect", () =>{
        console.log(`Socker disconnected ${socket.id}`)
    })
    socket.on("chatMessage", (msg:String) =>{
        console.log(msg)
        io.emit("receivedMsg",msg); // to broadcast to all the sockets in the circuit
    })

    io.emit("randomMsg","hello")
})

server.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})