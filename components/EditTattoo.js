import React, { useState } from 'react';
import axios from 'axios';

const EditUserImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/editUserImage', { image: imageUrl, userPrompt });
      setNewImageUrl(response.data.url);
    } catch (error) {
      console.error('Error generating new image:', error);
      alert('There was an error generating the image.');
    }

    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Describe your modifications"
          style={{ padding: '10px', fontSize: '16px', height: '100px' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>
          {isLoading ? 'Processing...' : 'Generate Image'}
        </button>
      </form>

      {newImageUrl && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img src={newImageUrl} alt="Generated Image" style={{ maxWidth: '100%', maxHeight: '500px' }} />
        </div>
      )}
    </div>
  );
};

export default EditUserImage;
