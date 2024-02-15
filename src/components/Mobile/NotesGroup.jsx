import React, { useState } from "react";
import circle from "../../images/button.png";
import plus from "../../images/+.png";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const NotesGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupNames, setGroupNames] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || {}
  );
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [color, setColor] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleNotes = (groupName) => {
    setSelectedGroupName(groupName);
    localStorage.setItem("selectedGroupName", groupName);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          opacity: isModalOpen ? 0.6 : 1,
          fontFamily: "Roboto, sans-serif",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
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
                padding: "40px 20px",
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
                    width: "100%",
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
                      width: "30px",
                      height: "30px",
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
                  <Link to={"/notes"}>
                    {" "}
                    <h2
                      style={{
                        cursor: "pointer",
                        color: " black",
                        textDecoration: "none",
                        listStyle: "none",
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
                    </h2>
                  </Link>
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
                left: "70%",
              }}
              onClick={openModal}
            >
              <img style={{ position: "sticky", width: "60px" }} src={circle} />
              <img
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "50%",
                  transform: "translate(50%, -50%)",
                  width: "20px",
                }}
                src={plus}
              />
            </button>
          </div>
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

export default NotesGroup;
