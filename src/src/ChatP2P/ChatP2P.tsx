import { useState } from "react";
import Chat from "./Chat/Chat";
export const chatSocket = new WebSocket("ws://just-chat-be.fly.dev");

const ChatP2P = () => {
  const [chatLog, setChatLog] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  chatSocket.onopen = () => {
    console.log("Connected to the WebSocket server");
  };

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    data.id === 'clients-connected' && setTotalUsers(data.content);
    //@ts-ignore
    data.id === 'chatdb' && setChatLog([...data.content]);
  };

  chatSocket.onclose = () => {
    console.log("Disconnected from the WebSocket server");
  };

  return <Chat chatLog={chatLog} totalUsers={totalUsers}/>;
};

export default ChatP2P;
