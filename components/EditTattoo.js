import React, { useState } from 'react';

const EditTattoo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [modificationRequest, setModificationRequest] = useState('');
  const [modifiedTattoo, setModifiedTattoo] = useState(null);

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

    // Create FormData to send the file and text
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('modificationRequest', modificationRequest);

    // Replace with your API endpoint for handling the modification
    const response = await fetch('/api/editTattoo', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setModifiedTattoo(data.modifiedTattooUrl);
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
        Render New Tattoo Design
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