const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection");

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
