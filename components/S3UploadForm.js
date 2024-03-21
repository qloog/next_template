import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '@/app/UploadForm.css';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [labels, setLabels] = useState(null);
  const navigate = useNavigate(); // Create a navigate function using useNavigate

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setLabels(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to upload');

    setUploading(true);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = reader.result;

        const response = await fetch('/api/imageUpload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!response.ok) throw new Error('Image upload failed');

        const { labels } = await response.json();
        setLabels(labels);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = (error) => {
      console.error('Error converting image to Base64:', error);
      setUploading(false);
    };
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <label className="file-input-label">
          <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          Choose File
        </label>
        {fileName && <span className="file-name">{fileName}</span>}
        <button type="submit" disabled={uploading} className="upload-button">
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {labels && (
        <div className="labels-container">
          <ul className="labels-list">
            {labels.map((label, index) => (
              <li key={index} className="label-item">{label}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="go-to-gallery-button" onClick={() => navigate('/gallery')}>
        Go to Gallery
      </button>
    </div>
  );
}







/*

import { useState } from 'react';

export const maxDuration = 120;
export const dynamic = 'force-dynamic'

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [labels, setLabels] = useState(null); // Initialize labels as null

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setLabels(null); // Reset labels when file changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to upload');
  
    setUploading(true);
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = reader.result;
  
        // First, upload the image to your '/api/imageUpload' endpoint
        let response = await fetch('/api/imageUpload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64Image })
        });
  
        if (!response.ok) throw new Error('Image upload failed');
  
        // After upload, use the base64Image to get labels from '/api/gpt4ImageLabeling'
        response = await fetch('/api/gpt4ImageLabeling', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64Image })
        });
  
        if (!response.ok) throw new Error('Image labeling failed');
  
        // Extract the labels from the response and update the state
        const result = await response.json();
        setLabels(result.labels); // Update labels state with the received labels
  
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    };
  
    reader.onerror = (error) => {
      console.error('Error converting image to Base64:', error);
      setUploading(false);
    };
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading and Labeling...' : 'Upload Image'}
        </button>
      </form>
      {labels && labels.length > 0 && (
        <div>
          <h3>Image Labels:</h3>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


*/