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

// Store messages per room
const roomMessages = new Map<string, Message[]>();
const MESSAGES_LIMIT = 50;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join-room", ({ username, roomId }) => {
    // Leave previous rooms
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    // Join new room
    socket.join(roomId);
    console.log(`${username} joined room: ${roomId}`);

    // Initialize room messages if not exists
    if (!roomMessages.has(roomId)) {
      roomMessages.set(roomId, []);
    }

    // Send existing room messages to the new client
    const messages = roomMessages.get(roomId) || [];
    socket.emit("previous-messages", messages);
  });

  socket.on("send-message", ({ message, roomId }) => {
    console.log("received message:", message);

    const newMessage = {
      ...message,
    };

    // Store message in room's message history
    const messages = roomMessages.get(roomId) || [];
    messages.push(newMessage);

    // Limit messages per room
    if (messages.length > MESSAGES_LIMIT) {
      messages.shift();
    }
    roomMessages.set(roomId, messages);

    // Broadcast message to room members only
    io.to(roomId).emit("new-message", newMessage);
    console.log("broadcasted message:", newMessage);
  });
  socket.on("leave-room", ({ username, roomId }) => {
    socket.leave(roomId);
    console.log(`${username} left room: ${roomId}`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const SERVER_PORT = process.env.SERVER_PORT || 3001;
httpServer.listen(SERVER_PORT, () => {
  console.log(`Socket.IO server running on port ${SERVER_PORT}`);
});

// Test the server
const testMessage = {
  id: "test",
  username: "System",
  content: "Server is running",
};
console.log("Test message:", testMessage);
