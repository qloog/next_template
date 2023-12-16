import Image from "next/image";
import ButtonLead from "./ButtonLead";
import ButtonGradient from "@/components/ButtonGradient";
  
function Hero() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-left lg:text-left lg:items-start">
        <a
          //href="https://www.producthunt.com/posts/shipfast-2?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-shipfast&#0045;2"
          target="_blank"
          className=" -mb-4 md:-mb-6 group"
          //title="Product Hunt link"
        >  
        </a>

        <h1 className="font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-white text-align:left">
        Fire your tattoo consulter
        </h1>
        <p className="text-lg opacity-80 leading-relaxed text-white">
        Design your own tattoo with the first AI Tattoo Consulter
        </p>
  
      <p>Findrr is the first AI Tattoo Consulter in the world.</p>
      <p>Upload photos of your own, and then use Findrr to transform it into a custom design. Get Tattoo design inspiration and new ideas for your tattoo.</p>
        
        </div>

      
        <ButtonGradient>
        className=&quot;btn btn-gradient animate-shimmer&quot;
        type=&quot;submit&quot;
        disabled={isDisabled}
    
        Start using Findrr now
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </ButtonGradient>
  
    

      

      

      <div className="lg:w-full">
       
      </div>
    </section>
  );
}


export default Hero;
