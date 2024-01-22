import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";
import TestimonialRating from "@/components/TestimonialRating";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 px-8 py-8 lg:py-20 bg-black"
      style={{
        backgroundImage: "url('/media/animated-background-wallpaper-gifs-tenor.gif')",
        backgroundSize: "cover", // Ensures the image covers the whole section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
     
    >
      
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
        <h1 className="text-white font-medium font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
          Create beautiful AI custom tattoos within seconds
        </h1>

        <p className="font-medium text-lg leading-relaxed text-white"></p>
        <p className="font-medium text-lg leading-relaxed text-white">
          Save money and use AI to turn your tattoo ideas into custom designs
          right from your phone or laptop. No need for expensive artist&apos;s, just
          your imagination
        </p>
        <TestimonialRating></TestimonialRating>
        <SigninButton className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"></SigninButton>
        <p className="text-white text-align:left opacity-80">as seen in</p>
        <Image
          src="/media/fastcompany.png"
          width={120}
          height={120}
          alt="fastcompany"
          priority={true}
        />

        <Image
          src="/media/archdaily.png"
          width={120}
          height={120}
          alt="fastcompany"
          priority={true}
        />

        <Image
          src="/media/stability.png"
          width={120}
          height={120}
          alt="fastcompany"
          priority={true}
        />
        <Image
          src="/media/logo-techcrunch.png"
          width={120}
          height={120}
          alt="fastcompany"
          priority={true}
        />

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
