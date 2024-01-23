import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";
import TestimonialRating from "@/components/TestimonialRating";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 px-8 py-8 lg:py-20 bg-white text-black"
      style={{
        backgroundImage: 'url(/media/abstract-white-line-background-vector-illustration_54768-479.avif)', // Replace with your image URL
        backgroundSize: 'cover', // Cover the entire section with the image
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
      }}
    >
      
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
        <h1 className="text-black font-medium font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left lg:font-semibold">
          Create beautiful AI custom tattoos within seconds
        </h1>

        <p className="font-medium text-lg leading-relaxed  text-black">
          Save money and use AI to turn your tattoo ideas into custom designs
          right from your phone or laptop. No need for expensive artist&apos;s, just
          your imagination
        </p>
        <SigninButton className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"></SigninButton>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        ></div>
      </div>
    </section>
  );
}

export default Hero;
//<h1 className="font-medium font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
//<span class="bg-clip-text text-transparent bg-gradient-to-br from-[#007880] to-[#9C009F] leading-tight">Fire your tattoo designer</span>
//</h1>
