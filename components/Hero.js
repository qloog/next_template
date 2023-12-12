import Image from "next/image";
import ButtonLead from "./ButtonLead";

  //selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
var fileobj;


button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
  file_browse();
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


function upload_file(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    js_file_upload(fileobj);
}

function file_browse() {
  document.getElementById('file').onchange = function() {
      fileobj = document.getElementById('file').files[0];
      js_file_upload(fileobj);
  };
}


function js_file_upload(file_obj) {
    if(file_obj != undefined) {
        var form_data = new FormData();                  
        form_data.append('file', file_obj);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "upload.php", true);
        xhttp.onload = function(event) {
           
            if (xhttp.status == 200) {
                console.log("Uploaded!");
            } else {
               alert(xhttp.status);
            }
        }
 
        xhttp.send(form_data);
    }
}
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
        src="https://source.interiorai.com/1666362875"
        alt="NYT"
        priority={true}
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


export default Hero;
