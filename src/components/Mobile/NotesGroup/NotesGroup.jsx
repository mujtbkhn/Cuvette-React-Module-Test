import React, { useState } from "react";
import circle from "../../../images/button.svg";
import plus from "../../../images/+.png";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import "./notesGroup.css";

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
        className="notes-group-container"
        style={{
          opacity: isModalOpen ? 0.6 : 1,
        }}
      >
        <div className="notes">
          <h1>Pocket Notes</h1>
          <div className="group-names">
            {Object.keys(groupNames).map((groupName, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "between",
                  gap: "25px",
                  width: "100%",
                  backgroundColor:
                    selectedGroupName === groupName ? "#D4DEEE" : "transparent",
                }}
              >
                <h4
                  className="group-initial"
                  style={{
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
                <Link
                  to={"/notes"}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  onClick={() => {
                    handleNotes(groupName);
                  }}
                  key={index}
                >
                  <p  style={{ fontSize: "1.525rem" }}>{groupName}</p>
                  {localStorage.setItem(
                    "groupNames",
                    JSON.stringify(groupNames)
                  )}
                </Link>
              </div>
            ))}
          </div>
          <button className="create-btn" onClick={openModal}>
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
