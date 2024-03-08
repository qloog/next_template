import React, { useState } from "react";
import styles from "@/app/create.module.css"; // Import the CSS module

const Create = () => {
  const [prompt, setPrompt] = useState("");
  const [finalData, setFinalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      const data = await response.json();
      setFinalData(data.imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Describe a new tattoo or upload an existing one for me to edit</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your tattoo idea"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>Generate</button>
      <div className={styles.displayBox}>
        {isLoading ? (
          <p className={styles.loading}>Redesigning...</p>
        ) : (
          finalData && <img src={finalData} alt="Generated Tattoo" className={styles.image} />
        )}
      </div>
    </div>
  );
};

export default Create;
