import React, { useState } from 'react';

const EditTattoo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modificationRequest, setModificationRequest] = useState('');
  const [modifiedTattoo, setModifiedTattoo] = useState(null);
  const [isDesigning, setIsDesigning] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleModificationRequestChange = (e) => {
    setModificationRequest(e.target.value);
  };

  const handleEditTattoo = async () => {
    if (!selectedImage || !modificationRequest.trim()) {
      alert('Please select an image and specify the modifications.');
      return;
    }

    setIsDesigning(true);

    // Assuming the API expects a FormData with the image and the text request
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('modificationRequest', modificationRequest);

    try {
      const response = await fetch('/api/editUserImage', { // Adjust this endpoint as needed
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to modify the tattoo.');
      }

      const data = await response.json();
      setModifiedTattoo(data.modifiedTattooUrl); // Adjust according to your API response
    } catch (error) {
      console.error('Error:', error);
      alert('Error modifying the tattoo. Please try again.');
    } finally {
      setIsDesigning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <div>
          <p>Selected Image:</p>
          <img src={imagePreview} alt="Selected Tattoo" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
        </div>
      )}
      <textarea
        placeholder="Describe what you want changed..."
        value={modificationRequest}
        onChange={handleModificationRequestChange}
        style={{ display: 'block', margin: '20px auto', width: '80%', height: '100px' }}
      ></textarea>
      <button onClick={handleEditTattoo} disabled={isDesigning} style={{ padding: '10px 20px', margin: '10px' }}>
        {isDesigning ? 'Designing...' : 'Edit Your Tattoo'}
      </button>
      {modifiedTattoo && (
        <div>
          <p>Modified Tattoo:</p>
          <img src={modifiedTattoo} alt="Modified Tattoo" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default EditTattoo;
