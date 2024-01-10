import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 px-8 py-8 lg:py-20"
    style={{ 
      backgroundImage: "url('/media/IMG_5313 Small.jpeg')",
      backgroundSize: 'cover', // Ensures the image covers the whole section
      backgroundPosition: 'center', // Centers the image
      backgroundRepeat: 'no-repeat' // Prevents the image from repeating
    }}>
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
       
       
        <p className="font-medium text-lg opacity-80 leading-relaxed text-white">
        Findrr is the first AI Tattoo Designer in the world.
        </p>
        <p className="font-medium text-lg opacity-80 leading-relaxed text-white">
        Write your tattoo idea, and then use Findrr to transform it into a custom design. Get tattoo design inspiration and new ideas for your tattoo.
        </p>
        <SigninButton className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"></SigninButton>
        <p className="text-black text-align:left opacity-80"></p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >

        </div>
      </div>
    </section>
  );
}

export default Hero;
