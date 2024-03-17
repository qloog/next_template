import { useState } from 'react';
import Compressor from 'compressorjs';

export const maxDuration = 120
export const dynamic = "force-dynamic"

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [labels, setLabels] = useState(null); // Initialize labels as null

  const compressImage = (file, options) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        ...options,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file, {
          maxWidth: 1920, // Adjust based on your needs
          maxHeight: 1080,
          quality: 0.8, // Adjust compression quality
        });
        setFile(compressedFile);
        setLabels(null); // Reset labels when file changes
      } catch (error) {
        console.error('Compression error:', error);
      }
    }
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







/*
import { useState } from 'react';

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



/* import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64Image })
        });

        if (!response.ok) throw new Error('Image upload failed');

        const data = await response.json();
        console.log('Image uploaded:', data);
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
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
}
*/