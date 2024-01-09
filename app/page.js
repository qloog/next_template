"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import GeneratedImageCard from "@/components/ImageBox";
import Footer from "@/components/Footer";
import ButtonAccount from "@/components/ButtonAccount";
import Modal from "@/components/Modal";
import Header from "@/components/Header";

export default function Home() {
  const [style, setStyle] = useState("tattoo");
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup

  async function onGenerate(e) {
    setIsLoading(true);
    e.preventDefault();

    const fullPrompt = `${style}: ${prompt}`;

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    if (res.status !== 200) {
      console.log("Error: ", res.status);
      setIsLoading(false);

      if (res.status === 403) {
        setShowPopup(true);
      }

      return;
    }

    const results = await res.json();

    setFinalData(results.imageUrl);
    setIsLoading(false); // End loading
  }

  const buttonStyle1 = {
    backgroundColor: "#161616",
    color: "rgba(255, 255, 255, 0.8)", // White text with 80% opacity
    // Other styles...
  };

  const textboxStyle = {
    backgroundColor: "white", // White background for the textbox
    color: "black",
    // Add other necessary styles
  };

  const buttonStyle = {
    backgroundColor: isButtonActive ? "rgba(255, 255, 255, 0.8)" : "black",
    border: "none",
    borderRadius: "20px", // This makes the button oval-shaped
    padding: "10px 20px",
    cursor: "pointer",
    color: "white",
    // Add any other styles you need for the button
  };

  const handleMouseDown = () => {
    setIsButtonActive(true);
  };

  const handleMouseUp = () => {
    setIsButtonActive(false);
  };

  return (
    <>
      <Modal isModalOpen={showPopup} setIsModalOpen={setShowPopup} />
      <main className="bg-white text-black">
        <Header></Header>
        <Hero />
        <section
          id="tattoo-generator"
          className="max-w-7xl mx-auto flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-white"
        >
          <h3 className="font-semibold text-base-content text-lg opacity-80 text-black">
            Your Tattoo Idea
          </h3>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your tattoo idea"
            style={textboxStyle}
          />
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={buttonStyle1}
          >
            <option className="bg-white text-black" value="tattoo">Tattoo</option>
            <option className="bg-white text-black" value="sketch">Sketch</option>
            <option className="bg-white text-black" value="lineart">Line Art</option>
            <option className="bg-white text-black" value="painting">Painting</option>
          </select>
          <button
            style={buttonStyle}
            onClick={onGenerate}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            Render new Tattoo
          </button>
          <GeneratedImageCard finalData={finalData} isLoading={isLoading} />
        </section>

        <Footer></Footer>
      </main>
    </>
  );
}
