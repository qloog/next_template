
import Hero from "@/components/Hero";
import '/app/main.css'
import '/app/main.js'







export default function Home() {
  return (
    <>
    
      <main className="bg-black text-white">
      
        <Hero />
        <script src="../vendor/snow.js" defer></script>
        
      
      </main>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charset="utf-8"></meta>
        <link rel="shortcut icon" href="/assets/favicon.ico"></link>
	<link rel="stylesheet" href="./src/main.css"></link>
        

 
<body>
	<div class="drop-zone">
		<span class="drop-zone__prompt">Drop an image or tap to select</span>
		<input type="file" name="myFile" class="drop-zone__input"></input> 
	</div>
</body>
   
    </>

    
  );
}

