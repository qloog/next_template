import React, { useState } from 'react';

export default function ImageLabeler() {
    const [file, setFile] = useState(null);
    const [labels, setLabels] = useState(null);
    const [loading, setLoading] = useState(false);

    // Convert image to Base64
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleLabelImage = async () => {
        if (!file) {
            alert("Please select an image file.");
            return;
        }
        setLoading(true);
        setLabels(null);

        try {
            const base64Image = await toBase64(file);

            const response = await fetch('/api/gpt4ImageLabeling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64Image }), // Adjust according to how your backend expects the image
            });

            const data = await response.json();
            setLabels(data.labels || 'No labels received or error in processing the image.');
        } catch (error) {
            console.error('Error labeling image:', error);
            setLabels('Error fetching labels.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleLabelImage} disabled={loading}>
                Label Image
            </button>
            {loading && <p>Loading...</p>}
            {labels && (
                <div>
                    <h3>Labels:</h3>
                    <p>{Array.isArray(labels) ? labels.join(', ') : labels}</p>
                </div>
            )}
        </div>
    );
}
