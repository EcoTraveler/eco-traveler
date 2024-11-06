"use client";

import { useState, useEffect, useRef } from "react";
import { Message, MessageType } from "@/type";
import { useSocket } from "@/hooks/useSocket";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import rupiah from "@/db/utils/rupiah";

interface Room {
  _id: string;
  name: string;
  budget: string;
  destination: string[];
  hotel: string[];
  clerkId: string;
  planningId: string;
  status: string;
  MyPlan: {
    name: string;
    budget: string;
  };
}

export default function ChatRoom() {
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();
  const { user } = useUser();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/chatroom?userId=${user?.id}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Failed to fetch rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    if (user?.id) {
      fetchRooms();
    }
  }, [user?.id]);
  console.log(rooms, "<<rooms");

  useEffect(() => {
    if (!socket) return;

    socket.on("previous-messages", (previousMessages: Message[]) => {
      setMessages(previousMessages);
    });
    
    // socket.on("new-message", (message: Message) => {
    //   setMessages((prev) => [...prev, message.message]);
    // });

    return () => {
      socket.off("previous-messages");
      socket.off("new-message");
    };
  }, [socket]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoom && user) {
      setIsJoined(true);
      socket?.emit("join-room", {
        username: user.fullName || "Anonymous",
        roomId: selectedRoom,
      });
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    if (!selectedRoom) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/message?roomId=${selectedRoom}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!socket || !user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user.id,
            roomId: selectedRoom,
            content,
            username: user.fullName,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to send message");

      const message: Message = {
        username: user?.fullName || "Anonymous",
        content,
        roomId: selectedRoom,
        clerkId: user.id,
      };

      socket.emit("send-message", { message, roomId: selectedRoom });
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLeaveRoom = () => {
    setIsJoined(false);
    setSelectedRoom("");
    setMessages([]);
    socket?.emit("leave-room", {
      username: user?.fullName,
      roomId: selectedRoom,
    });
  };

  if (!isJoined) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Join Chat Room
              </CardTitle>
              <CardDescription>Select a room to join the chat</CardDescription>
            </CardHeader>
            <form onSubmit={handleJoin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="room-select" className="text-sm font-medium">
                    Select Room
                  </label>
                  <select
                    id="room-select"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.MyPlan?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Join Chat
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  const currentRoom = rooms.find((room) => room._id === selectedRoom);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {currentRoom?.name || "Chat Room"}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-normal">{user?.fullName}</span>
              </div>
            </CardTitle>
            <CardDescription>
              Budget: {rupiah(Number(currentRoom?.MyPlan?.budget))}, Status:{" "}
              {currentRoom?.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessageList
              key={messages.length}
              messages={messages}
              currentUser={user?.fullName || ""}
            />
            <div ref={bottomRef} />
          </CardContent>
          <CardFooter className="border-t flex flex-col gap-4">
            <MessageInput onSendMessage={handleSendMessage} />
            <Button
              onClick={handleLeaveRoom}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Leave Room
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
