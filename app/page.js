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
import CTA from "@/components/CTA";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Testimonials11 from "@/components/Testimonials11";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const [style, setStyle] = useState("tattoo");
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup
  const { data: session } = useSession();
  const [showLoginSignupPrompt, setShowLoginSignupPrompt] = useState(false);
  const [includeInGallery, setIncludeInGallery] = useState(false);

  async function onGenerate(e) {
    setIsLoading(true);
    e.preventDefault();

    if (!session) {
      // If not logged in, only scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShowLoginSignupPrompt(true);
      setIsLoading(false);
      return;
    }

    const fullPrompt = `${style}: ${prompt}`;

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fullPrompt, includeInGallery }),
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
          <label>
            <input
              type="checkbox"
              checked={includeInGallery}
              onChange={(e) => setIncludeInGallery(e.target.checked)}
            />
            Include in Gallery
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

/* <div>
      <style jsx>{`
        @keyframes animatedgradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
*/

/* .animated-text {
          font-size: 24px; /* Adjust size as needed */
// font-weight: bold;
// background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
//background-size: 300% 300%;
//-webkit-background-clip: text;
///-webkit-text-fill-color: transparent;
//animation: animatedgradient 6s ease infinite alternate;
// }

//`}</style>

//<h1 className="animated-text">TATTOOSWITHAI</h1>
//</div>
