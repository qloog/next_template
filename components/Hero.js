import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
       
    

      <h1 class="bg-clip-text text-transparent bg-gradient-to-br from-[#007880] to-[#9C009F] leading-tight">Fire your Tattoo Designer</h1>
        <p className="font-medium text-lg opacity-80 leading-relaxed text-black">
          Custom Tattoo Designs printed from the comfort of your home
        </p>

        <p className="font-medium ">
          Transform any tattoo idea into a custom tattoo for less than 3x the price from a Designer
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
