import { useEffect, useState } from "react";
import { chatSocket } from "../ChatP2P";
import "./Chat.css";

type Chat = {
  username: string;
  message: string;
  timeStamp: string;
};

type ChatProps = {
  chatLog: Chat[];
  totalUsers: number;
};

const Chat = ({ chatLog, totalUsers }: ChatProps) => {
  const [input, setInput] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [username, setUsername] = useState("");

  // -- UseEffects
  useEffect(() => {
    setTimeout(() => {
      (
        document.querySelector(".message-area")?.lastChild as Element
      )?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [username, chatLog]);

  const handleChatSubmit = (e: any) => {
    if (e.key === "Enter") {
      chatSocket.send(
        JSON.stringify({
          username: username,
          message: e.target.value,
          timeStamp: new Date().toLocaleString("en-GB", { timeZone: "UTC" }),
        })
      );
      setInput("");
    }
  };

  const handleUsernameSubmit = (e: any) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 12) {
        alert("Username too long");
        return;
      }
      setUsername(e.target.value);
    }
  };

  return (
    <div className="chat-component">
      {!username && (
        <div className="chat-title">
          <h1>
            Welcome to <span className="chat-title-text">Just Chat</span>
          </h1>
          <input
            type="text"
            value={usernameField}
            onChange={(e) => setUsernameField(e.target.value)}
            onKeyDown={handleUsernameSubmit}
            placeholder="Enter username"
            className="chat-input"
            maxLength={12}
          />
        </div>
      )}
      {username && (
        <>
          <div className="meassage-area-header">
            <span className="chat-title-text">Just Chat</span>
            <span>Users Online : {totalUsers}</span>
          </div>
          <div className="message-area">
            {chatLog.map((chat, index) => {
              return (
                <div
                  key={index}
                  className={`message-bubble ${
                    chat.username === username
                      ? "message-bubble-user"
                      : "message-bubble-others"
                  }`}
                >
                  <div className="message-header">
                    <span className="message-user">
                      {chat.username === username ? "You" : chat.username}
                    </span>
                    <span className="message-time">{chat.timeStamp}</span>
                  </div>
                  <div className="message-text">{chat.message}</div>
                </div>
              );
            })}
          </div>
          <div className="chat-input-container">
            <input
              id="chatbox"
              type="text"
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleChatSubmit}
              autoFocus
              className="chat-input"
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
