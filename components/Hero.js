import React, { useState, useRef } from "react";
import config from "@/config";
import SigninButton from "@/components/ButtonSignIn";
import Image from "next/image";
const priceId = config.stripe.plans[0].priceId; // Assuming it's the first plan

function Hero() {
  return (
    <section className="heroBackground max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
        <a
          //href="https://www.producthunt.com/posts/shipfast-2?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-shipfast&#0045;2"
          target="_blank"
          className=" -mb-4 md:-mb-6 group"
          //title="Product Hunt link"
        ></a>

        <h1 className="font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-white text-align:left">
          Fire your tattoo Designer
        </h1>
        <p className="text-lg opacity-80 leading-relaxed text-white">
          Design your own tattoo with the first AI Tattoo Designer
        </p>

        <p>
          Write your tattoo idea, and Findrr will transform it into a custom
          design. Get Tattoo design inspiration and new ideas for your tattoo.
        </p>
        <SigninButton className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"></SigninButton>


        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginright: '20px' }}>
    <Image src="/media/The-New-York-Times-logo-whiteWEB-1.png" alt="NYT" priority={true} width={200} height={200} />
    <Image src="/media/tech crunch.png" alt="TC" priority={true} width={50} height={50} />
    <Image src="/media/fastcompany.png" alt="FC" priority={true} width={50} height={50} />
    <Image src="/media/stability.png" alt="ST.AI" priority={true} width={50} height={50} />
    <Image src="/media/archdaily.png" alt="AD" priority={true} width={50} height={50} />
</div>

      </div>
    </section>
  );
}

export default Hero;
