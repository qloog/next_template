import React, { useState } from 'react';

const ImageUploadAndDisplay = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadAndGenerate = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/openai/generateImage', {
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
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUploadAndGenerate}>Render new design</button>
            {generatedImage && (
                <div style={{ marginTop: '20px' }}>
                    <img src={generatedImage} alt="Generated Tattoo" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploadAndDisplay
