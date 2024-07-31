const express = require("express");
import { Server } from "socket.io";
import { createServer } from "http";
const cors = require("cors");

const server = createServer();
const app = express();

const isDev = app.settings.env === "development";

const URL = isDev
  ? "http://localhost:3000"
  : "https://google-meet-clone-puce.vercel.app";

app.use(cors({ origin: [URL, "http://localhost:3000"], credentials: true }));

const io = new Server(server, {
  cors: {
    origin: [URL, "http://localhost:3000"],
    credentials: true,
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId);
    console.log("emiting");
    socket.broadcast.to(roomId).emit("user-connected", userId);
    console.log("emitted");
  });

  socket.on("user-toggle-audio", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
  });

  socket.on("user-toggle-video", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-video", userId);
  });

  socket.on("user-leave", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-leave", userId);
  });
});

server.listen(4000, () => {
  console.log(`server started at port 4000`);
});
