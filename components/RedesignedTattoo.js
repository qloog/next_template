// components/ImageGenerator.jsx

import React, { useState } from 'react';

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace `/api/generate-image` with the path to your backend endpoint
      const response = await fetch('/api/editUserImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, prompt }),
      });
      const data = await response.json();
      setGeneratedImage(data.imageUrl); // Assuming `data.imageUrl` is the URL to the generated image
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Generate Image</button>
      </form>
      {generatedImage && (
        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
