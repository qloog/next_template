import Image from "next/image";
import ButtonLead from "./ButtonLead";


  
function Hero() {
  return (
    <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <a
          //href="https://www.producthunt.com/posts/shipfast-2?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-shipfast&#0045;2"
          target="_blank"
          className=" -mb-4 md:-mb-6 group"
          //title="Product Hunt link"
        >  
        </a>

        <h1 className="font-sans-serif text-4xl lg:text-6xl tracking-tight md:-mb-4 text-white">
        💉Fire your tattoo consulter
        </h1>
        <p className="text-lg opacity-80 leading-relaxed text-white">
        Design your own tattoo with the first AI Tattoo Consulter
        </p>
  
      <p>Findrr is the first AI Tattoo Consulter in the world.</p>
      <p>Upload photos of your own, and then use Findrr to transform it into a custom design. Get Tattoo design inspiration and new ideas for your tattoo.</p>
        <ButtonLead>Join Waitlist</ButtonLead>
     

        <div class="hero_footer_logos">
			<p style="font-size:10px;opacity:0.5;margin:0;margin-right:7px;display:inline-block;vertical-align:middle;">
				as seen in
			</p>
			<a target="_blank" href="https://www.nytimes.com/2022/10/21/technology/ai-generated-art-jobs-dall-e-2.html" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" alt="New York Times" src="/assets/featured-nyt.png?1666362875" loading="lazy">
			</a>
			<a target="_blank" href="https://techcrunch.com/2023/07/25/wayfairs-new-app-uses-generative-ai-to-transform-your-space/amp/" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;mix-blend-mode: lighten;vertical-align: middle;" alt="TechCrunch" src="/assets/techcrunch.png?1695837841" loading="lazy">
			</a>
			<a target="_blank" href="https://www.fastcompany.com/90793736/snap-a-photo-of-your-living-room-and-interiorai-will-redesign-it" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" alt="FastC omapny" src="/assets/featured-fastcompany.png?1668015726" loading="lazy">
			</a>
			<a target="_blank" href="https://businessofhome.com/articles/we-had-designers-test-an-ai-design-tool-here-s-how-it-went" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" alt="Business of Home" src="/assets/featured-boh.png?1668015343" loading="lazy">
			</a>
			<a href="https://www.diamandis.com/podcast/emad-mostaque">
				<img height="25" loading="lazy" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" src="https://avatarai.me/cdn-cgi/image/format=auto,fit=cover,height=50,quality=50/assets/stability-ai.png?">
			</a>
			<a target="_blank" href="https://www.archdaily.com/990043/new-ai-image-generator-can-help-users-redesign-their-own-spaces/633d4c64dd0b8954dd1d630a-new-ai-image-generator-can-help-users-redesign-their-own-spaces-photo" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" alt="ArchDaily" src="/assets/featured-archdaily.png?1697470424" loading="lazy">
			</a>

			<a target="_blank" href="https://www.msn.com/pt-br/estilo-de-vida/casa-e-decoracao/site-gratuito-decora-qualquer-c%C3%B4modo-da-sua-casa-a-partir-de-uma-foto/ar-AA138NqE?li=AAggNbi" style="text-decoration: none;">
				<img height="25" style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;" alt="MSN" src="/assets/featured-msn.png?1668015905" loading="lazy">
			</a>
		</div>

        <div class="hero_footer_logos">
			<p style="font-size:10px;opacity:0.5;margin:0;margin-right:7px;display:inline-block;vertical-align:middle;">
				as seen in
			</p>

      <Image
        src="https://interiorai.com/assets/featured-nyt.png?1666362875"
        alt="NYT"
        height={25}
        style="text-decoration: none"
        style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;"
      />

      <Image
        src="https://interiorai.com/assets/techcrunch.png?1695837841"
        alt="Tech Crunch"
        height={25}
        style="text-decoration: none"
        style="margin-left: 14px;margin-right: 14px;mix-blend-mode: lighten;vertical-align: middle;"
      />

      <Image
        src="https://interiorai.com/assets/featured-fastcompany.png?1668015726"
        alt="fastcompany"
        height={25}
        style="text-decoration: none"
        style="margin-left: 14px;margin-right: 14px;filter: invert(1);mix-blend-mode: lighten;vertical-align: middle;"
        />

			
		</div>
       
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
