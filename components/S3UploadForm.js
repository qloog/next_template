import { useState } from 'react';

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
