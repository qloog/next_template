
import Hero from "@/components/Hero";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();







export default function Home() {
  return (
    <>
    
      <main className="bg-black text-white">
      
        <Hero />
        <script src="../vendor/snow.js" defer></script>
        
      
      </main>
  
    </>
  );
}

