import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
       
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g><path fill="url(#paint0_linear_3_2235)" d="M22.86 7.143a1.133 1.133 0 00-1.25-.16l-4.708 2.344-3.93-6.528a1.135 1.135 0 00-1.944 0L7.098 9.33 2.392 6.986a1.135 1.135 0 00-1.584 1.37l3.469 10.627a.75.75 0 001.095.412C5.395 19.381 7.792 18 12 18c4.207 0 6.604 1.381 6.626 1.394a.75.75 0 001.098-.411l3.469-10.625a1.131 1.131 0 00-.333-1.215zM16.485 14.7a.75.75 0 01-.87.609 21.396 21.396 0 00-7.239 0 .75.75 0 11-.26-1.478 22.917 22.917 0 017.76 0 .75.75 0 01.612.87h-.003z"></path></g><defs><linearGradient id="paint0_linear_3_2235" x1="12.002" x2="12.002" y1="2.25" y2="19.5" gradientUnits="userSpaceOnUse"><stop stop-color="#2A3966"></stop><stop offset="1" stop-color="#5C3293"></stop></linearGradient></defs>
        <p class="font-medium text-center text-black">Used by 1k+ happy customers</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g><path fill="url(#paint0_linear_3_2235)" d="M22.86 7.143a1.133 1.133 0 00-1.25-.16l-4.708 2.344-3.93-6.528a1.135 1.135 0 00-1.944 0L7.098 9.33 2.392 6.986a1.135 1.135 0 00-1.584 1.37l3.469 10.627a.75.75 0 001.095.412C5.395 19.381 7.792 18 12 18c4.207 0 6.604 1.381 6.626 1.394a.75.75 0 001.098-.411l3.469-10.625a1.131 1.131 0 00-.333-1.215zM16.485 14.7a.75.75 0 01-.87.609 21.396 21.396 0 00-7.239 0 .75.75 0 11-.26-1.478 22.917 22.917 0 017.76 0 .75.75 0 01.612.87h-.003z"></path></g><defs><linearGradient id="paint0_linear_3_2235" x1="12.002" x2="12.002" y1="2.25" y2="19.5" gradientUnits="userSpaceOnUse"><stop stop-color="#2A3966"></stop><stop offset="1" stop-color="#5C3293"></stop></linearGradient></defs>
        </svg>
        </svg>


        <h1 className="font-medium font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
          Fire your Tattoo Designer
        </h1>
        <p className="font-medium text-lg opacity-80 leading-relaxed text-black">
          Design your own tattoo with the first AI Tattoo Designer
        </p>

        <p className="font-medium ">
          Write your tattoo idea, and transform it into a custom
          design that has never been inked before
        </p>
        <SigninButton className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"></SigninButton>
        <p className="text-black text-align:left opacity-80">as seen in</p>
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
