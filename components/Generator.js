import React, { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function handleOnGenerate(e) {
    e.preventDefault();

    setIsLoading(true);
    setImage(undefined);
    setError(undefined);

    try {
      // Assuming '/api/generateImage' expects a POST request with a prompt
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: "A sikh warrior" }) // Your prompt here
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setImage(result.image); // Assuming the API returns an object with an 'image' key
    } catch(e) {
      setError(e.message);
    }

    setIsLoading(false);
  }

  return (
    <div>
      <button onClick={handleOnGenerate}>Render New Tattoo</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {image && <img src={image} alt="Generated Tattoo" />}
    </div>
  );
}
