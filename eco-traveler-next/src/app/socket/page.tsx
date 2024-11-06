"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  sender: string;
  content: string;
}

export default function ChatComponent() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("chat message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage && socket && username) {
      const newMessage: ChatMessage = {
        sender: username,
        content: inputMessage,
      };
      socket.emit("chat message", newMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bubble Chat</h1>
      {!username ? (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Button onClick={() => setUsername(username)}>Set Username</Button>
        </div>
      ) : (
        <>
          <ScrollArea
            className="flex-grow mb-4 p-4 border rounded-md"
            ref={scrollAreaRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === username ? "text-right" : "text-left"
                }`}>
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === username
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}>
                  <p className="font-bold text-sm">{msg.sender}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </>
      )}
    </div>
  );
}
