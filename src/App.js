import React, { useEffect, useState } from "react";
import {io} from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage(event.target.value);
            event.target.value = "";
          }
        }}
      />
    </div>
  );
}

export default App;