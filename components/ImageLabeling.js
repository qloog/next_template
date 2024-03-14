import React, { useState } from 'react';

export default function ImageLabeler() {
    const [imageUrl, setImageUrl] = useState('');
    const [labels, setLabels] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLabelImage = async () => {
        setLoading(true);
        setLabels(null);
        
        try {
            const response = await fetch('/api/gpt4ImageLabeling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            const data = await response.json();
            setLabels(data);
        } catch (error) {
            console.error('Error labeling image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL here"
            />
            <button onClick={handleLabelImage} disabled={loading}>
                Label Image
            </button>
            {loading && <p>Loading...</p>}
            {labels && (
                <div>
                    <h3>Labels:</h3>
                    <p>{JSON.stringify(labels)}</p>
                </div>
            )}
        </div>
    );
}
