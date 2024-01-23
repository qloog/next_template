import Image from "next/image";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero bg-white text-black min-h-screen">
      
      <div className="relative hero-overlay bg-white"></div>
      <div className="relative hero-content text-white text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12 text-align:left bg-white text-black">
          Try TattooswithAI for free today

          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16 text-align:left text-black">
          Create your first custom piece with TattooswithAI today and never look back
          </p>

          <button
            className="btn btn-primary btn-block w-full max-w-xs space-y-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start using TattooswithAI now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
