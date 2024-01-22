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
import Testimonials11 from "@/components/Testimonials11"; 
import { useSession } from "next-auth/react";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

export default function Home() {
  const [style, setStyle] = useState("tattoo");
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup
  const { data: session } = useSession();
  async function onGenerate(e) {
    setIsLoading(true);
    e.preventDefault();

    if (!session) {
      // If not logged in, only scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
      return;
    }

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
  const Arrow = ({ extraStyle }) => {
    return (
      <svg
        className={`shrink-0 w-12 fill-neutral-content opacity-70 bg-black ${extraStyle}`}
        viewBox="0 0 138 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
          />
        </g>
      </svg>
    );
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
          
          <div>
      <style jsx>{`
        @keyframes animatedgradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-text {
          font-size: 24px; /* Adjust size as needed */
          font-weight: bold;
          background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: animatedgradient 6s ease infinite alternate;
        }
      `}</style>

      <h1 className="animated-text">TATTOOSWITHAI</h1>
    </div>
    <div className="logo-container">
                <Image
                  src={logo}
                  alt={`${config.appName} logo`}
                  priority={true}
                  width={24}
                  height={24}
                />
              </div>

              <style jsx>{`
                @keyframes animatedgradient {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }

                .logo-container {
                  width: 24px;
                  height: 24px;
                  background: linear-gradient(
                    60deg,
                    #f79533,
                    #f37055,
                    #ef4e7b,
                    #a166ab,
                    #5073b8,
                    #1098ad,
                    #07b39b,
                    #6fba82
                  );
                  background-size: 300% 300%;
                  animation: animatedgradient 6s ease infinite alternate;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .logo-container :global(img) {
                  mix-blend-mode: multiply;
                }
              `}</style>
    

          <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
           Design Your Tattoo
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
        <section className="bg-black items-center justify-center">
        <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
        </section>
        <FeaturesAccordion></FeaturesAccordion>
        <Testimonials11></Testimonials11>
        <section>
        <FAQ></FAQ>
        </section>
        <section id="pricing" className="font-semibold text-base-content text-lg text-white bg-black">
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

