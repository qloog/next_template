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
    backgroundColor: "white",
    color: "black", // White text with 80% opacity
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g><path fill="url(#paint0_linear_3_2235)" d="M22.86 7.143a1.133 1.133 0 00-1.25-.16l-4.708 2.344-3.93-6.528a1.135 1.135 0 00-1.944 0L7.098 9.33 2.392 6.986a1.135 1.135 0 00-1.584 1.37l3.469 10.627a.75.75 0 001.095.412C5.395 19.381 7.792 18 12 18c4.207 0 6.604 1.381 6.626 1.394a.75.75 0 001.098-.411l3.469-10.625a1.131 1.131 0 00-.333-1.215zM16.485 14.7a.75.75 0 01-.87.609 21.396 21.396 0 00-7.239 0 .75.75 0 11-.26-1.478 22.917 22.917 0 017.76 0 .75.75 0 01.612.87h-.003z"></path></g><defs><linearGradient id="paint0_linear_3_2235" x1="12.002" x2="12.002" y1="2.25" y2="19.5" gradientUnits="userSpaceOnUse"><stop stop-color="#2A3966"></stop><stop offset="1" stop-color="#5C3293"></stop></linearGradient></defs></svg>
        <p class="font-medium text-center">Used by 1k+ happy customers</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g><path fill="url(#paint0_linear_3_2235)" d="M22.86 7.143a1.133 1.133 0 00-1.25-.16l-4.708 2.344-3.93-6.528a1.135 1.135 0 00-1.944 0L7.098 9.33 2.392 6.986a1.135 1.135 0 00-1.584 1.37l3.469 10.627a.75.75 0 001.095.412C5.395 19.381 7.792 18 12 18c4.207 0 6.604 1.381 6.626 1.394a.75.75 0 001.098-.411l3.469-10.625a1.131 1.131 0 00-.333-1.215zM16.485 14.7a.75.75 0 01-.87.609 21.396 21.396 0 00-7.239 0 .75.75 0 11-.26-1.478 22.917 22.917 0 017.76 0 .75.75 0 01.612.87h-.003z"></path></g><defs><linearGradient id="paint0_linear_3_2235" x1="12.002" x2="12.002" y1="2.25" y2="19.5" gradientUnits="userSpaceOnUse"><stop stop-color="#2A3966"></stop><stop offset="1" stop-color="#5C3293"></stop></linearGradient></defs></svg>
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
            <option value="tattoo">Tattoo</option>
            <option value="sketch">Sketch</option>
            <option value="lineart">Line Art</option>
            <option value="painting">Painting</option>
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
