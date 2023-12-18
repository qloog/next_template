"use client";

import Hero from "@/components/Hero";
import ".//main.css"
import ".//main.js"

export default function Home() {
  return (
    <>
      <main className="bg-black text-white">
        <Hero />
      </main>
 <section className="max-w-7xl mx-auto bg-black flex flex-col lg:flex-row text-left gap-16 lg:gap-20 px-8 py-8 lg:py-20 bg-black">
<h3 className="font-semibold text-base-content text-lg opacity-80 text-white">
  Your current design
  </h3>

  
<html lang="en"></html>
<head><meta charset="UTF-8"></meta>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
	<link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
	<link rel="stylesheet" href="main.css"></link>
	<title>Input Image With Preview Image</title></head>
	

<body>
	
	<div class="container">
		<input type="file" id="file" accept="image/*" hidden></input>
		<div class="img-area" data-img="">
			<i class='bx bxs-cloud-upload icon'></i>
			<h3>Upload Image</h3>
			<p>Image size must be less than <span>2MB</span></p>
		</div>
		<button class="select-image">Select Image</button>
	</div>
	
	<script src="script.js"></script>
</body>
 </section>






      
    </>
  );
}
