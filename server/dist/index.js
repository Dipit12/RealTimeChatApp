"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
app.get("/", (req, res) => {
    res.json({ msg: "Server is up" });
});
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log(`Socker disconnected ${socket.id}`);
    });
    socket.on("chatMessage", (msg) => {
        console.log(msg);
        io.emit("receivedMsg", msg); // to broadcast to all the sockets in the circuit
    });
    io.emit("randomMsg", "hello");
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
