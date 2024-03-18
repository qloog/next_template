// /api/imageUpload.js

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export async function POST(req) {
  await connectMongo();

  const { image } = await req.json();

  try {
    const newImage = new Image({ data: image });
    await newImage.save();

    return new Response(JSON.stringify({ imageId: newImage._id }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return new Response(JSON.stringify({ error: 'Error saving image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


/* import { useState } from 'react';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

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

        // Upload the image
        let uploadResponse = await fetch('/api/imageUpload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!uploadResponse.ok) throw new Error('Image upload failed');

        // Get the uploaded image ID or some identifier
        const uploadedImage = await uploadResponse.json();
        const imageId = uploadedImage._id; // Assuming the image document has an _id field

        // Process the image for labeling
        let labelResponse = await fetch('/api/gpt4ImageLabeling', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageId: imageId }), // Send the image ID to the labeling endpoint
        });

        if (!labelResponse.ok) throw new Error('Image labeling failed');

        // Extract the labels from the response and update the state
        const result = await labelResponse.json();
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