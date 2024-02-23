"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import GeneratedImageCard from "@/components/ImageBox";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Testimonials11 from "@/components/Testimonials11";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import TattooEditor from "@/components/EditTattoo";

export default function Home() {
  const [style, setStyle] = useState("tattoo");
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup
  const { data: session } = useSession();
  const [showLoginSignupPrompt, setShowLoginSignupPrompt] = useState(false);
  const [uploadToGallery, setUploadToGallery] = useState(false);

  async function onGenerate(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!session) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShowLoginSignupPrompt(true);
      setIsLoading(false);
      return;
    }

    const fullPrompt = `${style}: ${prompt}`;
    try {
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

      // Check if the user wants to upload the generated image to the gallery
      if (uploadToGallery) {
        // Replace 'generatedImageUrl' with your actual variable that holds the image URL from DALL·E
        const uploadResponse = await fetch("/api/uploadToGallery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: results.imageUrl }),
        });

        if (!uploadResponse.ok) {
          // Handle upload error
          console.error("Failed to upload image to gallery");
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setIsLoading(false);
    }
  }

  const selectStyle = {
    backgroundColor: "#ffffff", // Consistent with the textarea
    border: "1px solid #cccccc", // Light border for a delicate look
    borderRadius: "5px", // Rounded corners to match the textarea
    color: "#333333", // Text color for readability
    padding: "10px 12px", // Padding for visual comfort, slightly less vertical padding than textarea for differentiation
    fontSize: "1rem", // Font size to maintain consistency
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Soft shadow to match the textarea
    appearance: "none", // Remove default browser styling
    WebkitAppearance: "none", // Also for Safari
    MozAppearance: "none", // Also for Firefox
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20"><path fill="%23333333" d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"/></svg>')`, // Custom dropdown arrow
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center", // Position for the custom arrow
    marginRight: "0.5rem", // Ensure select doesn't touch any sibling elements
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out", // Smooth transition for interactions
  };

  const textboxStyle = {
    backgroundColor: "#ffffff", // Cleaner to use hex codes for color
    border: "1px solid #cccccc", // Lighter border for subtlety
    borderRadius: "5px", // Rounded corners for a modern look
    color: "#333333", // Slightly softer than pure black for readability
    padding: "12px", // Slightly more padding for better text input visibility
    fontSize: "1rem", // Maintains default size, adjust based on preference
    outline: "none", // Removes the default focus outline
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    transition: "border-color 0.2s ease-in-out", // Smooth transition for interactions
    // Ensures the input stands out when focused
    ":focus": {
      borderColor: "#007bff", // Highlight color when the textbox is focused
      boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)", // Expands the shadow for focus indication
    },
  };

  const buttonStyle = {
    fontFamily: "'Poppins', sans-serif", // Use the Inter font
    fontWeight: 600,
    backgroundColor: "black",
    color: "white", // White text for contrast
    fontSize: "1rem", // Adjust based on your preference
    padding: "10px 20px", // Ample padding for a larger clickable area
    border: "none", // Removes the default border
    borderRadius: "5px", // Slightly rounded corners for a modern look
    cursor: "pointer", // Changes the cursor to indicate clickable
    transition: "background-color 0.3s ease", // Smooth transition for hover effect
    ":hover": {
      backgroundColor: "#2b6cb0", // Darkens the button on hover for an interactive effect
    },
    outline: "none", // Removes the outline to keep the design clean
  };

  const handleMouseDown = () => {
    setIsButtonActive(true);
  };

  const handleMouseUp = () => {
    setIsButtonActive(false);
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
        id="hotjar-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3851321,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YVYWH0C0XS"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-YVYWH0C0XS');
          `}
      </Script>
      <Header></Header>
      <style jsx>{`
        .login-signup-prompt {
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          margin-top: 20px;
        }
      `}</style>

      {showLoginSignupPrompt && (
        <div className="login-signup-prompt">
          <p>
            Sign up for an account below. If you already have an account,
            we&apos;ll log you in.
          </p>
          <button onClick={() => setShowLoginSignupPrompt(false)}>Close</button>
        </div>
      )}

      <Modal isModalOpen={showPopup} setIsModalOpen={setShowPopup} />
      <main className="bg-white text-black">
        <Hero />
        <section
          id="tattoo-generator"
          className="max-w-7xl mx-auto flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-white text-black"
        >
          <p
            className="font-medium text-sm mb-2"
            style={{ color: "rgb(23, 34, 190)" }}
          >
            DESIGN YOUR TATTOO
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your tattoo idea"
            style={textboxStyle}
            rows="4" // Specifies the initial number of lines
          />
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={selectStyle}
          >
            <option value="Original">Original</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Tribal">Tribal</option>
            <option value="Japanese">Japanese</option>
            <option value="Traditional">Traditional</option>
            <option value="Realism">Realism</option>
          </select>

          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={uploadToGallery}
              onChange={(e) => setUploadToGallery(e.target.checked)}
            />
            Upload to Gallery
          </label>

          <button
            className="btn w-full max-w-xs space-y-3 "
            style={buttonStyle}
            onClick={onGenerate}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            Render new tattoo
          </button>
          <GeneratedImageCard finalData={finalData} isLoading={isLoading} />
          <TattooEditor></TattooEditor>
        </section>
        <Problem></Problem>
        <FeaturesAccordion></FeaturesAccordion>
        <section>
          <Testimonials11></Testimonials11>
        </section>
        <section>
          <FAQ></FAQ>
        </section>
        <section
          id="pricing"
          className="text-base-content text-lg bg-white text-black"
        >
          <Pricing></Pricing>
        </section>
        <CTA></CTA>
        <Footer></Footer>
      </main>
    </>
  );
}
