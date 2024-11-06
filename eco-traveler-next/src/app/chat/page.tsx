"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/type";
import { useSocket } from "@/hooks/useSocket";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  
  useEffect(() => {
    if (!socket) return;

    socket.on("previous-messages", (previousMessages: Message[]) => {
      setMessages(previousMessages);
    });

    socket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("previous-messages");
      socket.off("new-message");
    };
  }, [socket]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!socket) return;

    const message: Message = {
      id: uuidv4(),
      username,
      content,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send-message", message);
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Join Chat Room
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleJoin}>
            <CardContent>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Join Chat
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat Room
            </div>
            <span className="text-sm font-normal">Welcome, {username}!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MessageList messages={messages} currentUser={username} />
        </CardContent>
        <CardFooter className="border-t">
          <MessageInput onSendMessage={handleSendMessage} />
        </CardFooter>
      </Card>
    </div>
  );
}
