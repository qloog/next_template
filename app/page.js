"use client";

import Hero from "@/components/Hero";


export default function Home() {
  return (
    <>
      <main className="bg-black text-white">
        <Hero />
      </main>

      <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Tattoo Idea
        </h3>
        <div>
      <button onClick={handleOnGenerate}>Render New Tattoo</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {image && <img src={image} alt="Generated Tattoo" />}
    </div>
      </section>

    </>
  );
}
