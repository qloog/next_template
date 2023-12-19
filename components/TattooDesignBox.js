import React, { useState } from 'react';

const TattooGenerator = () => {
    const [description, setDescription] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedTattoo, setGeneratedTattoo] = useState('');

    const handleGenerateTattoo = async () => {
        try {
            let requestBody;

            if (uploadedImage) {
                // Assuming the image is handled as a base64 string or similar
                // This is placeholder logic; actual implementation depends on how you handle image data
                requestBody = { image: 'base64_or_other_format_data' };
            } else {
                requestBody = { prompt: description };
            }

            const response = await fetch('/api/generateImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGeneratedTattoo(data.imageUrl);
        } catch (error) {
            console.error('Error generating tattoo:', error);
            // Handle errors appropriately in the UI
        }
    };

    return (
        <div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your tattoo idea here"
            />
            <input
                type="file"
                onChange={(e) => setUploadedImage(e.target.files[0])}
            />
            <button onClick={handleGenerateTattoo}>Render new idea</button>
            {generatedTattoo && <img src={generatedTattoo} alt="Generated Tattoo" />}
        </div>
    );
};

export default TattooGenerator;
