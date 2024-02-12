import React, { useState } from 'react';

const EditTattoo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [modificationRequest, setModificationRequest] = useState('');
  const [modifiedTattoo, setModifiedTattoo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleModificationRequestChange = (event) => {
    setModificationRequest(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !modificationRequest) {
      alert('Please select a file and enter your modification request.');
      return;
    }

    setIsSubmitting(true);

    // Create FormData to send the file and text
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('modificationRequest', modificationRequest);

    try {
      // Replace '/api/editTattoo' with your actual API endpoint
      const response = await fetch('/api/editTattoo', {
        method: 'POST',
        body: formData,
        // Don't set 'Content-Type' header when sending FormData;
        // the browser will set it automatically, including the boundary parameter.
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setModifiedTattoo(data.modifiedTattooUrl);
    } catch (error) {
      console.error('Error modifying tattoo:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-tattoo-container" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <textarea
        placeholder="Describe what you want changed..."
        value={modificationRequest}
        onChange={handleModificationRequestChange}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          display: 'block',
          width: '100%',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isSubmitting ? 'Redesigning...' : 'Render New Tattoo Design'}
      </button>
      {modifiedTattoo && (
        <div style={{ marginTop: '20px' }}>
          <img src={modifiedTattoo} alt="Modified Tattoo" style={{ width: '100%', borderRadius: '5px' }} />
        </div>
      )}
    </div>
  );
};

export default EditTattoo;
