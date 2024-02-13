import React, { useState } from "react";

export default function EditTattoo() {
  const [image, setImage] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");

  function handleFileChange(event) {
    if (!event.target.files || event.target.files.length === 0) {
      alert("No file selected. Please choose a file.");
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (image === "") {
      alert("Please upload an image before submitting.");
      return;
    }

    fetch("/api/editUserImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: image }),
    })
    .then(async (response) => {
        if (!response.body) {
          throw new Error("No response body");
        }
  
        const reader = response.body.getReader();
        let responseText = "";
  
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          responseText += new TextDecoder().decode(value);
        }
  
        setOpenAIResponse(responseText);
    })
    .catch((error) => {
      console.error("Error processing image:", error);
    });
  }

  return (
    <div className="edit-tattoo-wrapper bg-gray-100 p-5 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
    <h2 className='text-2xl font-semibold mb-5 text-center'>Edit Your Tattoo</h2>
    {image && (
      <div className="image-preview mb-4">
        <img src={image} alt="Uploaded Tattoo" className="mx-auto" style={{ maxHeight: '300px', maxWidth: '100%' }} />
      </div>
    )}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className='block text-sm font-medium mb-1'>Upload Image</label>
        <input
          type="file"
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Modification Request</label>
        <textarea
          className="w-full p-2 text-sm border rounded-md"
          placeholder="Describe what you want changed..."
          value={modificationRequest}
          onChange={(e) => setModificationRequest(e.target.value)}
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className={`w-full text-white p-2 rounded-md ${isEditing ? 'bg-gray-400' : 'bg-sky-600 hover:bg-sky-700'}`} disabled={isEditing}>
        {isEditing ? 'Designing...' : 'Edit Your Tattoo'}
      </button>
    </form>
    {openAIResponse && (
      <div className="mt-5 p-3 rounded-md border border-gray-200">
        <h3 className='text-lg font-semibold mb-2'>AI Response</h3>
        <p className='text-sm'>{openAIResponse}</p>
      </div>
    )}
  </div>
);
}
