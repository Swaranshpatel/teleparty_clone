const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors()); // Allow all origins for HTTP requests

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for WebSocket connections
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Client joined room: ${roomId}`);
  });

  socket.on("video-event", (data) => {
    // Broadcast to other clients in the room except sender
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    rooms.forEach((room) => {
      socket.to(room).emit("video-event", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
console.log("Starting server on port:", PORT);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Catch unhandled promise rejections and uncaught exceptions to avoid silent crashes
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  process.exit(1);
});
