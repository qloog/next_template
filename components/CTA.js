import { signIn } from "next-auth/react";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative hero text-black bg-white min-h-screen">
      <div className="relative hero-overlay bg-white"></div>
      <div className="relative hero-content text-black text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2
            className=" text-3xl md:text-5xl tracking-tight mb-8 md:mb-12 text-align: center text-black text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Try TattooswithAI for free today
          </h2>
          <p
            className="text-lg opacity-80 mb-12 md:mb-16 text-align:center text-center text-black"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
           Design your first tattoo with TattooswithAI today and never
            look back
          </p>

          <button
            className="btn btn-block w-full max-w-xs space-y-3 text-white"
            style={{
              fontFamily: "'Poppins', sans-serif", // Use the Inter font
              fontWeight: 600,
              backgroundColor: "rgb(50, 61, 214)",
            }}
            onClick={() =>
              signIn(undefined, { callbackUrl: config.auth.callbackUrl })
            }
          >
           Sign up for 2 free credits
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
