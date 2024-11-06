"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/type";
import { ScrollArea } from "./ui/scrollarea";

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export function MessageList({ messages, currentUser }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-[600px] p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.username === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.username === currentUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {message.username}
                </span>
              </div>
              <p className="mt-1">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
