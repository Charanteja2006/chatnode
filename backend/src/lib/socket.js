import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ENV.CLIENT_URL,
        credentials: true,
    }
});

//apply auth middleware
io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

// this will hold mapping of userId to socketId
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log(`New client connected:${socket.userId}`);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.userId}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

});

export { io, server, app};