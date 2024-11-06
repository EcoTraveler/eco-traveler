"use client";

import React, { useRef, useState, useEffect } from "react";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat Page</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            {message}
          </div>
        ))}
        <div ref={bottomRef} /> {/* This is where the ref is attached */}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          style={{ width: "80%", padding: "10px" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
