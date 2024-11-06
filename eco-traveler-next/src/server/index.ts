import { createServer } from "http";
import { Server } from "socket.io";
import { Message } from "@/type";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const messages: Message[] = [];
const MESSAGES_LIMIT = 50;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send existing messages to new clients
  socket.emit("previous-messages", messages);

  socket.on("send-message", (message: Message) => {
    const newMessage = {
      ...message,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    if (messages.length > MESSAGES_LIMIT) {
      messages.shift();
    }

    io.emit("new-message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
