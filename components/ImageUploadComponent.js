// components/ImageUploadComponent.js
import React, { useState } from 'react';

const ImageUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadAndGenerate = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/generateImage', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGeneratedImage(data.imageUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadAndGenerate}>Upload and Generate</button>
            {generatedImage && <img src={generatedImage} alt="Generated Image" />}
        </div>
    );
};

export default ImageUploadComponent;
