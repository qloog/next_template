import React, { useState } from "react";
import GeneratedImageCard from "@/components/ImageBox";
import { useSession } from "next-auth/react";

const Create = () => {
  const [style, setStyle] = useState("tattoo");
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for showing the popup
  const { data: session } = useSession();
  const [showLoginSignupPrompt, setShowLoginSignupPrompt] = useState(false);
  const [uploadToGallery, setUploadToGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('create');





  // Modify the onGenerate function to accept prompt and state setters directly
  const onGenerate = async () => {
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
  
      if (uploadToGallery) {
        // Call the uploadImageToGallery function with the generated image URL
        await uploadImageToGallery(results.imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setIsLoading(false);
    }
  };
  
  // Button onClick should be modified to call onGenerate directly
  
  

// Update the button's onClick handler to pass the necessary arguments
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


  const handleMouseDown = () => {
    setIsButtonActive(true);
  };

  const handleMouseUp = () => {
    setIsButtonActive(false);
  };

  return (
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
        rows="4"
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
  );
};


export default Create;
