import { set } from "mongoose";
import React, { useState } from "react";

const RenderButton = ({ onClick }) => {
  const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px", // Gives an oval shape
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
  };
  async function onGenerate(e) {
    e.preventDefault();
    const [image, setImage] = useState();
    const results = await fetch("/api/generateImage").then((r) => r.json());
    setImage(results.image);
  }

  return (
    <button style={buttonStyle} onClick={onClick}>
      Render New Idea
    </button>
  );
};

export default RenderButton;
