
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";




export default function Home() {
  return (
    <>
    
      <main className="bg-black text-white">
        <Hero />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

