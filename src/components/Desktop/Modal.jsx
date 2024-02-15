import React, { useEffect, useRef, useState } from "react";
import blue from "../../images/blue.png";
import brown from "../../images/brown.png";
import darkblue from "../../images/dark blue.png";
import skyblue from "../../images/sky blue.png";
import violet from "../../images/violet.png";
import purple from "../../images/purple.png";

const Modal = ({ isOpen, onClose, setGroupNames, setColor }) => {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelection = (color) => {
    setColor(color);
    setSelectedColor(color);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isOpen) return;

      const modalContent = document.getElementById("modal-content");
      if (!modalContent.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGroupName = () => {
    if (input.trim() !== "" && selectedColor.trim() !== "") {
      setGroupNames((prevGroupNames) => ({
        ...prevGroupNames,
        [input]: { color: selectedColor },
      }));
      onClose();
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "300px",
        backgroundColor: "white",
        zIndex: 9999,
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
        borderRadius: "5px",
        padding: "20px",
        fontFamily: "Roboto, sans-serif",
      }}
      id="modal-content"
    >
      <h1>Create New Group</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <h2>Group Name</h2>
        <input
          style={{
            padding: "0 60px",
            borderRadius: "20px",
            height: "40px",
            margin: "auto 0",
            border: "1px solid",
          }}
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {/* {console.log(inputName.current.value)} */}
      </div>
      <div style={{ display: "flex" }}>
        <h2>Choose color</h2>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#FF79F2")}
          >
            <img src={violet} />
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#B38BFA")}
          >
            <img src={purple} />
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#43E6FC")}
          >
            <img src={skyblue} />
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#F19576")}
          >
            <img src={brown} />
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#0047FF")}
          >
            <img src={darkblue} />
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelection("#6691FF")}
          >
            <img src={blue} />
          </button>
        </div>
      </div>
      <button
        style={{
          display: "flex",
          position: "absolute",
          right: "30px",
          padding: "10px 30px",
          color: "white",
          fontSize: "18px",
          backgroundColor: "#001f8b",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleGroupName}
      >
        Create
      </button>
    </div>
  );
};

export default Modal