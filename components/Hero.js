import Image from "next/image";
import ButtonLead from "./ButtonLead";

function Hero() {
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
        
        <div className="flex justify-center items-center gap-6 mt-6">
          <Image src="https://toppng.com/uploads/preview/new-york-times-logo-white-png-transparent-11563028567xgsn0x1sph.png"  alt="New York Times Logo" width={100} height={50} />
          <Image src="/path/to/stability-ai-logo.png" alt="Stability.ai Logo" width={100} height={50} />
          <Image src="/path/to/fastcompany-logo.png" alt="Fast Company Logo" width={100} height={50} />
          <Image src="/path/to/techcrunch-logo.png" alt="TechCrunch Logo" width={100} height={50} />
          <Image src="/path/to/archdaily-logo.png" alt="ArchDaily Logo" width={100} height={50} />
        </div>
        
      </div>
    </section>
  );
}

export default Hero;
