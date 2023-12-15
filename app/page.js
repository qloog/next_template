'use client';

import Hero from "@/components/Hero";
import '/app/main.css'
import '/app/main.js'




export default function Home() {
  return (
    <>
    
      <main className="text-white">
        <Hero />
        
      </main>
        
  
 
      <head>
	<meta charset="utf-8"></meta>
	<link rel="stylesheet" type="text/css" href="app.css"></link>
	<meta http-equiv="X-UA-Compatible" content="IE=7"></meta>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta></head>

     
  <body>

    <div class="card">
    	<div class="top">
    	<p>Drag & drop image uploading</p>
    	<button type="button">Upload</button>
    	</div>
    	<div class="drag-area">
    	<span class="visible">
			Drag & drop image here or
			<span class="select" role="button">Browse</span>
			</span>
			<span class="on-drop">Drop images here</span>
    	<input name="file" type="file" class="file" multiple />
    	</div>
    	<div class="container"></div>
    </div>
</body>
   
    </>

    
  );
}

