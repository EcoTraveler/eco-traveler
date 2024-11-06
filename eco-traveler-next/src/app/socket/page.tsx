"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  autoConnect: false,
});

export default function Room() {
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      socket.auth = { username };
    }

    socket.connect();

    socket.on("welcome", (message) => {
      console.log(message, ">>>>>>>>>>>>>>");
    });

    return () => {
      // Remove listeners and disconnect on unmount
      socket.off("welcome");
      socket.disconnect();
    };
  }, []);

  return <div>wo</div>;
}
