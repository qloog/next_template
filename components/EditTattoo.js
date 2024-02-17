import React, { useState } from "react";
import axios from "axios";

export default function TattooEditor() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const generateDescription = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/api/editUserImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDescription(response.data);
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload an Image and Generate Tattoo Description</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={generateDescription} disabled={!image || isLoading}>
        {isLoading ? "Generating..." : "Generate Description"}
      </button>
      {description && (
        <div>
          <h2>Tattoo Description:</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
