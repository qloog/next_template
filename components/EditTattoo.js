import React, { useState } from "react";

export default function TattooEditor() {
  const [image, setImage] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  function handleFileChange(event) {
    if (!event.target.files || event.target.files.length === 0) {
      window.alert("No file selected. Choose a file.");
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result);
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.log("error: " + error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!image) {
      alert("Upload an image.");
      return;
    }

    await fetch("/api/editUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
      }),
    })
      .then(async (response) => {
        const reader = response.body.getReader();
        setOpenAIResponse("");

        let done = false;
        while (!done) {
          const { done: isDone, value } = await reader.read();
          done = isDone;
          if (!done) {
            var currentChunk = new TextDecoder().decode(value);
            setOpenAIResponse((prev) => prev + currentChunk);
          }
        }
      })
      .then(() => {
        // Fetch the generated image from the same endpoint
        fetch("/api/editUserImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: openAIResponse,
          }),
        })
          .then((response) => response.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setGeneratedImage(url);
          });
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-md">
      <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
        {image ? (
          <div className="mb-4 overflow-hidden">
            <img src={image} className="w-full object-contain max-h-72" />
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, you will see it here.</p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="p-2 bg-sky-600 rounded-md mb-4">
              Ask ChatGPT To Analyze Your Image
            </button>
          </div>
        </form>

        {generatedImage && (
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl font-bold mb-2">Generated Image</h2>
            <img src={generatedImage} className="w-full object-contain max-h-72" />
          </div>
        )}
      </div>
    </div>
  );
}








/*

import React, { useState } from "react";

export default function TattooEditor() {
  const [image, setImage] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");

  function handleFileChange(event) {
    if (!event.target.files || event.target.files.length === 0) { // Check if files array is empty
      window.alert("No file selected. Choose a file.");
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result);
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.log("error: " + error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!image) { // Check if image is truthy
      alert("Upload an image.");
      return;
    }

    await fetch("/api/editUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
      }),
    })
    .then(async (response) => {
        const reader = response.body.getReader(); // Remove optional chaining since response.body is always defined
        setOpenAIResponse("");
      
        let done = false;
        while (!done) { // Replace constant condition with a condition based on the value of done
          const { done: isDone, value } = await reader.read();
          done = isDone;
          if (!done) {
            var currentChunk = new TextDecoder().decode(value);
            setOpenAIResponse((prev) => prev + currentChunk);
          }
        }
      });
      
      
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-md">
      <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
        {image ? (
          <div className="mb-4 overflow-hidden">
            <img src={image} className="w-full object-contain max-h-72" />
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, you will see it here.</p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="p-2 bg-sky-600 rounded-md mb-4">
              Ask ChatGPT To Analyze Your Image
            </button>
          </div>
        </form>

        {openAIResponse !== "" ? (
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl font-bold mb-2">AI Response</h2>
            <p>{openAIResponse}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

*/