import React, { useState, useEffect } from "react";

const WebSocketDemo = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const HEARTBEAT_TIMEOUT = 1000 * 5 + 1000 * 1; // 5 + 1 second
  const HEARTBEAT_VALUE = 1;

  useEffect(() => {
    const ws = new WebSocket(process.env.WEB_SOCKET_BACKEND_URL);

    function heartbeat() {
      if (!ws) {
        return;
      } else if (!!ws.pingTimeout) {
        clearTimeout(ws.pingTimeout);
      }

      ws.pingTimeout = setTimeout(() => {
        ws.close();
        // business logic for deciding whether or not to reconnect
      }, HEARTBEAT_TIMEOUT);

      const data = new Uint8Array(1);
      data[0] = HEARTBEAT_VALUE;
      ws.send(data);
    }

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      heartbeat();
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      heartbeat(); // Trigger the next heartbeat
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");

      if (!!ws.pingTimeout) {
        clearTimeout(ws.pingTimeout);
      }
    };

    setWs(ws);

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    console.log("ws:", ws);
    if (ws && message.trim() !== "") {
      ws.send(message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebSocketDemo;
