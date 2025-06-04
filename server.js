const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
  });

  socket.on("video-event", (data) => {
    const room = socket.roomId;
    if (room) {
      socket.to(room).emit("video-event", data);
    }
  });
});