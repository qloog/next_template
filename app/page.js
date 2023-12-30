"use client";

import React, {useState} from 'react'; 
import Hero from "@/components/Hero";
import GeneratedImageCard from "@/components/ImageBox"

export default function Home() {
 
  const [style, setStyle] = useState('tattoo');
  const [prompt, setPrompt] = useState('');
  const [finalData, setFinalData] = useState();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onGenerate(e) {
    setIsLoading(true);
    e.preventDefault();
     const fullPrompt = `${style}: ${prompt}`;
      const results = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
        
      }).then(r => r.json());
      setFinalData(results.imageUrl)
      setIsLoading(false); // End loading
  }

  const handleStyleChange = (newStyle) => {
    setStyle(newStyle);
};

const buttonStyle1 = {
  backgroundColor: '#161616',
  color: 'rgba(255, 255, 255, 0.8)', // White text with 80% opacity
  // Other styles...
};

  const textboxStyle = {
    backgroundColor: 'white', // White background for the textbox
    color: 'black'
    // Add other necessary styles
  };

  const buttonStyle = {
    backgroundColor: isButtonActive ? 'rgba(255, 255, 255, 0.8)' : 'white',
    border: 'none',
    borderRadius: '20px', // This makes the button oval-shaped
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'black',
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
      <main className="bg-black text-white">
        <Hero />
        <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Tattoo Idea
        </h3>
        <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your tattoo idea" 
                style={textboxStyle} 
            />
            <select value={style} onChange={(e) => setStyle(e.target.value)} style={buttonStyle1}>
                        <option value="tattoo">Tattoo</option>
                        <option value="sketch">Sketch</option>
                        <option value="lineart">Line Art</option>
                        <option value="painting">Painting</option>
                    </select>
        <button style={buttonStyle} onClick={onGenerate} onMouseDown={handleMouseDown}  onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>Render new Tattoo</button>
        <GeneratedImageCard finalData={finalData} isLoading={isLoading} />
      </section>
      </main>

      
    </>
    
  );
}
