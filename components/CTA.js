import Image from "next/image";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen"
    style={{
      backgroundImage: "url('/media/39.957eee0b4d31250c64c05646f99c7c058d417dc8.gif')",
      backgroundSize: "cover", // Ensures the image covers the whole section
      backgroundPosition: "center", // Centers the image
      backgroundRepeat: "no-repeat", // Prevents the image from repeating
    }}>
      
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-white text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12 text-align:left text-white">
            Start designing your own tattoo
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16 text-align:left text-white">
            Design a custom tattoo with
            AI. Save money and use AI to turn your tattoo ideas into custom
            designs, right from your phone or laptop.
          </p>

          <button
            className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"
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
