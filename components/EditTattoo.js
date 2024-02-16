import React, { useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");

  function handleFileChange(event) {
    if (event.target.files === null) {
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
      console.log("Error:", error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (image === "") {
      alert("Upload an image.");
      return;
    }

    await fetch("api/analyzeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // base64 image
      }),
    })
      .then(async (response) => {
        const reader = response.body?.getReader();
        setOpenAIResponse("");
        while (true) {
          const { done, value } = await reader?.read();
          if (done) {
            break;
          }

          var currentChunk = new TextDecoder().decode(value);
          setOpenAIResponse((prev) => prev + currentChunk);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-md">
      <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8">
        <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
        {image !== "" ? (
          <div className="mb-4 overflow-hidden">
            <img src={image} className="w-full object-contain max-h-72" alt="Uploaded" />
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, you will see it here.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={handleFileChange}
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
