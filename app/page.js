"use client";

import Hero from "@/components/Hero";
import UploadForm from "@/components/UploadForm"

export default function Home() {
  return (
    <>
      <main className="bg-black text-white">
        <Hero />
        
      </main>
 <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
<h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
  Your current design
  </h3>
  UploadForm
 </section>






      
    </>
  );
}
