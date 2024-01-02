import Image from "next/image";
import ButtonLead from "./ButtonLead";
import React, { useState, useRef } from 'react'; 

function Hero() {
  const [showError, setShowError] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleUserSignUp = () => {
    setIsSignedUp(true);
    setShowError(false); // Remove the red border on successful sign-up
  };

  return (
    <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
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

        <p>Findrr is the first AI Tattoo Designer in the world.</p>
        <p>
          Write your tattoo idea, and then use Findrr to transform it into a
          custom design. Get Tattoo design inspiration and new ideas for your
          tattoo.
        </p>
        <ButtonLead showError={showError} onUserSignUp={handleUserSignUp}  className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3">
        Start using Findrr
        </ButtonLead>
    
      </div>
    </section>
  );
}

export default Hero;
