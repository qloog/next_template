import Image from "next/image";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMjE0MzY5Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-white text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12 text-align:left text-white">
            Start designing your own tattoo
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16 text-align:left text-white">
            Design custom tattoos that no one owns with
            AI. Save money and use AI to turn your tattoo ideas into custom
            designs, right from your phone or laptop.
          </p>

          <button
            className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start using Findrr now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
