
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
        
  
 
  <head> <meta charset="utf-8"></meta>
      <link rel="stylesheet" href="style.css"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/></head>
     
  
   <body>
      <div class="container">
         <div class="wrapper">
            <div class="image">
               <img src="" alt=""></img>
            </div>
            <div class="content">
               <div class="icon">
                  <i class="fas fa-cloud-upload-alt"></i>
               </div>
               <div class="text">
                  No file chosen, yet!
               </div>
            </div>
            <div id="cancel-btn">
               <i class="fas fa-times"></i>
            </div>
            <div class="file-name">
               File name here
            </div>
         </div>
         <button onclick="defaultBtnActive()" id="custom-btn">Choose or drag a image</button>
         <input id="default-btn" type="file" hidden></input>
      </div>
   </body>
   
    </>

    
  );
}

