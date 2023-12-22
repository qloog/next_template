"use client";

import React, {useState} from 'react'; 
import Hero from "@/components/Hero";
import ImageDisplay from "@/components/ImageBox"

export default function Home() {
  const [parsedData, setParsedData] = useState()
  async function onGenerate(e) {
    e.preventDefault();
    const results = await fetch('/api/generateImage').then(r => r.json());
    setParsedData[results.parsedData]
  }

  return (
    <>
      <main className="bg-black text-white">
        <Hero />
      </main>

      <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Tattoo Idea
        </h3>
        <button onClick={onGenerate}>Render new Tattoo</button>
        <ImageDisplay></ImageDisplay>
      </section>
    </>
  );
}
