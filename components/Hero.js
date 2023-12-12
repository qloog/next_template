import Image from "next/image";
import ButtonLead from "./ButtonLead";


  
function Hero() {
  return (
    <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
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
        <ButtonLead>Join Waitlist</ButtonLead>
     

        <div class="hero_footer_logos">
			<p>as seen in
			</p>
		</div>

        

      <Image
        src="https://cdn.discordapp.com/attachments/984272107569545227/1184166368371822693/featured-nyt.jpg?ex=658afbde&is=657886de&hm=cfe4b03b2ccbbf522b27088ccafe797e7a2c47d7977857004e5432a95aaf882a&"
        alt="NYT"
        height={25}
        
      />

      <Image
        src="https://interiorai.com/assets/techcrunch.png?1695837841"
        alt="Tech Crunch"
        height={25}
       
      />

      <Image
        src="https://interiorai.com/assets/featured-fastcompany.png?1668015726"
        alt="fastcompany"
        height={25} />
        </div>



      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMjE0MzY5Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          alt="Product demo"
          className="w-full"
          priority={true}
          width={500}
          height={500} />
      </div>
    </section>
  );
}
//src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
export default Hero;
