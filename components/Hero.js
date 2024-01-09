import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";

const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
        <a
          //href="https://www.producthunt.com/posts/shipfast-2?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-shipfast&#0045;2"
          target="_blank"
          className=" -mb-4 md:-mb-6 group"
          //title="Product Hunt link"
        ></a>

        <h1 className="font-medium font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
          Fire your Tattoo Designer
        </h1>
        <p className="text-lg opacity-80 leading-relaxed text-black">
          Design your own tattoo with the first AI Tattoo Designer
        </p>

        <p>
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
          <Image
            src="/media/The-New-York-Times-logo-whiteWEB-1.png"
            alt="NYT"
            priority={true}
            width={120}
            height={120}
          />
          <Image
            src="/media/tech crunch.png"
            alt="TC"
            priority={true}
            width={120}
            height={120}
          />
          <Image
            src="/media/fastcompany.png"
            alt="FC"
            priority={true}
            width={120}
            height={120}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
