import React, { useState } from "react";
import axios from "axios";

const EditUserImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userPrompt", userPrompt);

    try {
      const response = await axios.post("/api/editUserImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewImageUrl(response.data.url);
    } catch (error) {
      console.error("Error generating new image:", error);
      alert("There was an error generating the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <label
          htmlFor="image-upload"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {imageFile ? "Change Image" : "Upload Image"}
          <input
            id="image-upload"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
            style={{ display: "none" }}
          />
        </label>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Describe your modifications"
          style={{
            padding: "10px",
            fontSize: "16px",
            height: "100px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !imageFile}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: isLoading ? "default" : "pointer",
            backgroundColor: isLoading ? "#aaa" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isLoading ? "Processing..." : "Generate Image"}
        </button>
      </form>

      {newImageUrl && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            maxHeight: "500px",
            overflow: "hidden",
          }}
        >
          <img
            src={newImageUrl}
            alt="Generated Image"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default EditUserImage;
