const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Client joined room ${roomId}`);
  });

  socket.on("video-event", (data) => {
    const roomId = Object.keys(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      socket.to(roomId).emit("video-event", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
