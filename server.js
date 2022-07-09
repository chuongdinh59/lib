const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/user");
const cors = require("cors");
const dotevn = require("dotenv");
const { Server } = require("http");
const isValidSocket = require("./src/utils/isValidSocket");
// ================== SET UP ==================
dotevn.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(5000);

// ================== SOCKET.IO ==================

const userOnline = [];
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  // transport: ["websocket"],
});

server.listen(5001);
io.on("connection", (socket) => {
  console.log(socket.id + " da ket noi");
  socket.on("disconnect", () => {
    console.log(socket.id + " da ngat ket noi ");
  });
  socket.on("init-user", (userID) => {
    console.log(isValidSocket);
    if (!isValidSocket(userOnline, userID)) {
      userOnline.push({
        userID,
        socket: socket,
      });
      console.log(userOnline);
    }
  });
  socket.on("create-room", (friend) => {
    socket.join(`${friend.id}_${socket.id}`);
    console.log(userOnline);
    console.log(friend.id);
    const user_friend_index = userOnline.findIndex(
      (i) => i.userID === friend.id
    );
    console.log(user_friend_index);
    const friend_socket = userOnline[user_friend_index].socket;
    friend_socket.join(`${friend.id}_${socket.id}`);
    console.log(socket.adapter.rooms);
  });
});
