import React, { useEffect, useRef, useState } from "react";
import IMG from "../../images/pocket-notes.svg";
import lock from "../../images/Vector.png";
import circle from "../../images/button.png";
import plus from "../../images/+.png";
import send from "../../images/send.png";
import gray from "../../images/send-gray.png";
import Modal from "./Modal";

const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupNames, setGroupNames] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || {}
  );
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("");
  const [isSend, setIsSend] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleNotes = (groupName) => {
    setSelectedGroupName(groupName);
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

  // console.log(formattedDate[0]);
  return (
    <>
      <div
        style={{
          display: "flex",
          opacity: isModalOpen ? 0.6 : 1,
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexBasis: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "0 auto",
                padding: "20px",
                fontWeight: "600",
                position: "sticky",
              }}
            >
              Pocket Notes
            </h1>
            <div
              style={{
                height: "500px",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                // padding: "20px 60px",
                fontWeight: "500",
                cursor: "pointer",
                margin: "20px 0px 0px 20px",
              }}
            >
              {/* <div>{groupName[0]}</div> */}
              {Object.keys(groupNames).map((groupName, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "between",
                    gap: "15px",
                    backgroundColor:
                      selectedGroupName === groupName
                        ? "#D4DEEE"
                        : "transparent",
                  }}
                >
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto 0",
                      padding: "10px",
                      alignItems: "center",
                      width: "40px",
                      height: "40px",
                      color: "white",
                      fontWeight: "500",
                      borderRadius: "50%",
                      backgroundColor: groupNames[groupName].color || "white",
                    }}
                  >
                    {groupName.split(" ").map((word, index, array) => {
                      if (index === 0 || index === array.length - 1) {
                        return word.charAt(0).toUpperCase();
                      }
                      return null;
                    })}
                  </h4>
                  <h1
                    style={{
                      cursor: "pointer",
                      maxWidth: "80%",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      handleNotes(groupName);
                    }}
                    key={index}
                  >
                    {groupName}
                    {localStorage.setItem(
                      "groupNames",
                      JSON.stringify(groupNames)
                    )}
                  </h1>
                </div>
              ))}
            </div>
            <button
              style={{
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                position: "relative",
                display: "inline-block",
                width: "100px",
                height: "100px",
                left: "75%",
              }}
              onClick={openModal}
            >
              <img style={{ position: "sticky" }} src={circle} />
              <img
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "48%",
                  transform: "translate(50%, -50%)",
                }}
                src={plus}
              />
            </button>
          </div>
        </div>
        {selectedGroupName ? (
          <div
            style={{
              display: "flex",
              flexBasis: "70%",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                backgroundColor: "#16008B",
                color: "white",
                flexBasis: "10%",
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
                  backgroundColor:
                    groupNames[selectedGroupName].color || "white",
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
                flexBasis: "70%",
                backgroundColor: "#d4deee",
                overflowY: "scroll",
                scrollBehavior: "smooth",
              }}
            >
              {(groupNames[selectedGroupName]?.messages || []).map(
                (message, index) => (
                  <div
                    style={{
                      width: "95%",
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
                    {/* {localStorage.setItem("messages", JSON.stringify([...messages, newMessage]))} */}
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
                  width: "68%",
                  margin: "20px 20px",
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
                  bottom: "50px",
                  right: "50px",
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
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexBasis: "70%",
              backgroundColor: isModalOpen ? "rgba(0, 0, 0, 0.4)" : "#dae5f5",
              height: "100vh",
            }}
          >
            <img
              style={{
                width: "620px",
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
              }}
              src={IMG}
            />
            <h1 style={{ margin: "0 auto" }}>Pocket Notes</h1>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "500px",
                fontSize: "16px",
                paddingTop: "15px",
                fontWeight: "600",
              }}
            >
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: "10px",
                right: "30%",
              }}
            >
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "contain",
                  margin: "auto 0",
                }}
                src={lock}
              />
              <h3>end-to-end encrypted</h3>
            </div>
          </div>
        )}
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

export default Body;
