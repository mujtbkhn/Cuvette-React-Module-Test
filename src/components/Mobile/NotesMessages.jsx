import React, { useEffect, useRef, useState } from "react";
import send from "../../images/send.png";
import gray from "../../images/send-gray.png";
import Modal from "./Modal";

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

  //   useEffect(() => {
  //     const storedMessages = JSON.parse(localStorage.getItem("messages"));
  //     if (storedMessages) {
  //       setMessages(storedMessages);
  //       console.log("Stored messages:", storedMessages);
  //     }
  //   }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const time = new Date();

  const formattedDate = time
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newMessage = {
    timestamp: {
      date: formattedDate,
      time: formattedTime,
    },
    content: inputValue,
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        timestamp: {
          date: formattedDate,
          time: formattedTime,
        },
        content: inputValue,
      };
      // Update the local messages state
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      // Update localStorage with the updated messages
      localStorage.setItem("messages", JSON.stringify(updatedMessages));

      // Update groupNames with the new message
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexBasis: "10%",
            backgroundColor: "#16008B",
            color: "white",

          }}
        >
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 15px",
              padding: "10px",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: groupNames[selectedGroupName]?.color || "white",
              color: "white",
            }}
          >
            {selectedGroupName.split(" ").map((word, index, array) => {
              if (index === 0 || index === array.length - 1) {
                return word.charAt(0).toUpperCase();
              }
              return null;
            })}
          </p>
          <h2 style={{ margin: "auto 0px" }}>{selectedGroupName}</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "70%", // Adjust as needed
            backgroundColor: "#d4deee",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {(groupNames[selectedGroupName]?.messages || []).map(
            (message, index) => (
              <div
                style={{
                  width: "90%",
                  margin: "20px",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  fontFamily: "Roboto, sans-serif",
                  borderRadius: "4px",
                }}
                key={index}
              >
                <p style={{ padding: "20px" }}>{message.content}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "0 20px 10px 0",
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>
                    {message.timestamp?.date}
                  </div>
                  <div> ● </div>
                  <div style={{ paddingLeft: "10px" }}>
                    {message.timestamp?.time}
                  </div>
                </div>
                {/* {localStorage.setItem(
                  "messages",
                  JSON.stringify([...messages, newMessage])
                )} */}
              </div>
            )
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "20%", // Adjust as needed
            backgroundColor: "#16008B",
            borderRadius: "0px",
          }}
        >
          <input
            style={{
              position: "absolute",
              width: "87%",
              margin: "20px 25px",
              height: "15%",
              borderRadius: "10px",
            }}
            type="text"
            placeholder="Enter your text here..."
            value={inputValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setInputValue(newValue);
              setIsSend(newValue.trim().length > 0);
            }}
          />

          {/* <button> */}
          <img
            style={{
              position: "absolute",
              width: "30px",
              bottom: "80px",
              right: "30px",
              cursor: isSend ? "pointer" : "not-allowed",
              opacity: isSend ? 1 : 0.5,
            }}
            onClick={isSend ? sendMessage : undefined}
            src={isSend ? send : gray}
            alt={isSend ? "Send Message" : "Disabled"}
          />
          {/* </button> */}
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
