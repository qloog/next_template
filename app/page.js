
import Hero from "@/components/Hero";
import Script from "next/script";




export default function Home() {
  return (
    <>
    
      <main className="bg-black text-white">
        <Hero />
        <Script
        src="components/Script.js"
        />
      </main>
  
    </>
  );
}

