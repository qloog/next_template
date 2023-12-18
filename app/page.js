"use client";

import Hero from "@/components/Hero";
import UploadForm from "@/components/UploadForm";
import Output from "@/components/Output";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { useState } from "react";

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
      </section>

      <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
        <h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
          Your Custom-made Design
        </h3>

        <textarea
          id="prompt"
          name="prompt"
          placeholder="Enter a brief description..."
          value={formData.prompt}
          onChange={handleChange}
          required
        ></textarea>
      </section>
    </>
  );
}
