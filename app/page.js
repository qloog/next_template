"use client";

import Hero from "@/components/Hero";
import UploadForm from "@/components/UploadForm";
import SimpleTextarea from "@/components/Textbox";
import handleButtonClick from "@/components/Textbox"

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
        <UploadForm></UploadForm>
        <p className="text-white opacity-80">Generate Design through text instead?</p>
        <SimpleTextarea></SimpleTextarea>
       <handleButtonClick className="text-black"></handleButtonClick>
      </section>

      <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Custom-made Design
        </h3>

      </section>
    </>
  );
}
