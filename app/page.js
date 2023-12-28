"use client";

import React, {useState} from 'react'; 
import Hero from "@/components/Hero";
import GeneratedImageCard from "@/components/ImageBox"

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [finalData, setFinalData] = useState();

  async function onGenerate(e) {
    e.preventDefault();
      const results = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
        
      }).then(r => r.json());
      setFinalData(results.imageUrl)
    
    
  }

  const buttonStyle = {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '20px', // This makes the button oval-shaped
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'black',
    // Add any other styles you need for the button
  };

  return (
    <>
      <main className="bg-black text-white">
        <Hero />
      </main>

      <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Tattoo Idea
        </h3>
        <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your tattoo idea" 
            />
        <button style={buttonStyle} onClick={onGenerate}>Render new Tattoo</button>
        <GeneratedImageCard finalData={finalData} />
      </section>
    </>
    
  );
}
export const config = {
  runtime: "edge",
};