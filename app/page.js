"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import GeneratedImageCard from "@/components/ImageBox";
import Footer from "@/components/Footer";
import ButtonAccount from "@/components/ButtonAccount";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Image from "next/image";
import Pricing from "@/components/Pricing";
import config from "@/config";
import Testimonials3 from "@/components/Testimonials3";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA"
import Problem from "@/components/Problem"
import FeaturesAccordion from "@/components/FeaturesAccordion"

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
    border: "2px dotted gray",
    backgroundColor: "black",
    color: "white", // White text with 80% opacity
    // Other styles...
  };

  const textboxStyle = {
    backgroundColor: "black",
    border: "2px dotted gray", // White background for the textbox
    color: "white",
    padding: "10px", // Example padding, adjust as needed
    fontSize: "1rem",
    // Add other necessary styles
  };

  const buttonStyle = {
    backgroundColor: isButtonActive ? "rgba(255, 255, 255, 0.8)" : "white",
    border: "none",
    borderRadius: "20px", // This makes the button oval-shaped
    padding: "10px 20px",
    cursor: "pointer",
    color: "black",
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
      <ButtonAccount></ButtonAccount>
      <Modal isModalOpen={showPopup} setIsModalOpen={setShowPopup} />
      <main className="bg-white text-black">
        <Hero />
        <section
          id="tattoo-generator"
          className="max-w-7xl mx-auto flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black"
        >
          <span className="font-extrabold text-lg">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-br from-[#007880] to-[#9C009F] leading-tight  text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
              {config.appName}
            </h1>
          </span>

          <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
            Generate Your Tattoo
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
            <option value="Original">Original</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Tribal">Tribal</option>
            <option value="Japanese">Japanese</option>
            <option value="Traditional">Traditional</option>
            <option value="Realism">Realism</option>
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
        <Problem></Problem>
        <section>
        <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
        </section>
        <FeaturesAccordion></FeaturesAccordion>
        <Testimonials3></Testimonials3>
        <FAQ></FAQ>
        <section className=" font-semibold text-base-content text-lg text-white bg-black">
          <Pricing></Pricing>
        </section>
        <CTA></CTA>
        <Footer></Footer>
      </main>
    </>
  );
}


/* <section className="bg-black">
<h3
style={{ marginLeft: "20px" }}
className="font-semibold text-base-content text-lg opacity-80 text-white"
>
Latest Designs Gallery
</h3>

<div
style={{
  display: "flex",
  justifyContent: "center",
}}
>
<Image
  className="w-screen max-w-[22rem]"
  src="/media/IMG_5579.WEBP"
  alt="tattoo"
  priority={true}
  width={120}
  height={120}
/>
</div>

<div
style={{
  display: "flex",
  justifyContent: "center",
}}
>
<Image
  className="w-screen max-w-[22rem]"
  src="/media/IMG_5573.WEBP"
  alt="tattoo"
  priority={true}
  width={120}
  height={120}
/>
</div>

<div
style={{
  display: "flex",
  justifyContent: "center",
}}
>
<Image
  className="w-screen max-w-[22rem]"
  src="/media/lion.JPG"
  alt="tattoo"
  priority={true}
  width={120}
  height={120}
/>
</div>

<div
style={{
  display: "flex",
  justifyContent: "center",
}}
>
<Image
  className="w-screen max-w-[22rem]"
  src="/media/IMG_5351.WEBP"
  alt="tattoo"
  priority={true}
  width={120}
  height={120}
/>
</div>

<div
style={{
  display: "flex",
  justifyContent: "center",
}}
>
<Image
  className="w-screen max-w-[22rem]"
  src="/media/IMG_5412 Small.png"
  alt="tattoo"
  priority={true}
  width={120}
  height={120}
/>
</div>
</section>
*/