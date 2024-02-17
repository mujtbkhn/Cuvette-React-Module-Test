import React, { useEffect, useRef, useState } from "react";
import send from "../../../images/send.png";
import gray from "../../../images/send-gray.png";
import back from "../../../images/back.png";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import "./notesMessages.css";

const NotesMessages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupNames, setGroupNames] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || {}
  );
  const [selectedGroupName, setSelectedGroupName] = useState(
    localStorage.getItem("selectedGroupName") || ""
  );

  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("");
  const [isSend, setIsSend] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const time = new Date();

  const formattedDate = `${time.getDate()} ${time.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })}`;

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        timestamp: {
          date: formattedDate,
          time: formattedTime,
        },
        content: inputValue,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));

      setGroupNames((prevGroupNames) => ({
        ...prevGroupNames,
        [selectedGroupName]: {
          ...prevGroupNames[selectedGroupName],
          messages: [
            ...(prevGroupNames[selectedGroupName]?.messages || []),
            newMessage,
          ],
        },
      }));

      setInputValue("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="header" id="header">
          <Link to={"/"} className="back-link">
            <img src={back} alt="Back" />
          </Link>
          <p
            id="group-initial"
            style={{
              backgroundColor: groupNames[selectedGroupName]?.color || "white",
            }}
          >
            {selectedGroupName.split(" ").map((word, index, array) => {
              if (index === 0 || index === array.length - 1) {
                return word.charAt(0).toUpperCase();
              }
              return null;
            })}
          </p>
          <h2 id="group-name">{selectedGroupName}</h2>
        </div>
        <div className="messages-container">
          {(groupNames[selectedGroupName]?.messages || []).map(
            (message, index) => (
              <div className="message" key={index}>
                <p className="message-content">{message.content}</p>
                <div className="message-timestamp">
                  <div className="date">{message.timestamp?.date}</div>
                  <div className="separator"> ● </div>
                  <div className="time">{message.timestamp?.time}</div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="input-container">
          <textarea
            className="input-field"
            type="text"
            placeholder="Enter your text here..."
            value={inputValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setInputValue(newValue);
              setIsSend(newValue.trim().length > 0);
            }}
          ></textarea>
          <img
            className="send-button"
            onClick={isSend ? sendMessage : undefined}
            src={isSend ? send : gray}
            alt={isSend ? "Send Message" : "Disabled"}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        setGroupNames={setGroupNames}
        setColor={setColor}
      />
    </>
  );
};

export default NotesMessages;
