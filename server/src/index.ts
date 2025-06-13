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

io.on("connection", (socket: Socket) => {
    console.log("User connected", socket.id);

    socket.on("join-room", (roomID: string) => {
        socket.join(roomID);
        console.log(`User ${socket.id} joined room ${roomID}`);
        socket.to(roomID).emit("receivedMsg", `User ${socket.id} joined the room`);
    });

    socket.on("chatMessage", ({ roomID, message }: { roomID: string, message: string }) => {
        console.log(`Room ${roomID} | ${message}`);
        io.to(roomID).emit("receivedMsg", message);
    });

    socket.on("disconnect", () => {
        console.log(`Socket disconnected ${socket.id}`);
    });
});

server.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})