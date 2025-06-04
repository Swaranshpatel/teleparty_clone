const socket = io("https://your-server-url.com");

chrome.runtime.onMessage.addListener((req) => {
  if (req.action === "create") {
    socket.emit("join-room", Math.random().toString(36).substr(2, 6));
  } else if (req.action === "join") {
    socket.emit("join-room", req.roomId);
  }
});

const video = document.querySelector("video");

video.addEventListener("pause", () => {
  socket.emit("video-event", { type: "pause" });
});
video.addEventListener("play", () => {
  socket.emit("video-event", { type: "play" });
});
video.addEventListener("seeked", () => {
  socket.emit("video-event", { type: "seek", time: video.currentTime });
});

socket.on("video-event", ({ type, time }) => {
  if (type === "pause") video.pause();
  if (type === "play") video.play();
  if (type === "seek") video.currentTime = time;
});