// Import necessary hooks and components from React and Next.js
import { useState } from 'react';

const TattooRedesign = () => {
    // State for storing the input URL and the response from the API
    const [imageUrl, setImageUrl] = useState('');
    const [redesignUrl, setRedesignUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Handler for submitting the image URL to your API endpoint
    const handleSubmit = async () => {
        if (!imageUrl) {
            alert('Please enter a valid image URL');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            // Replace '/api/your-endpoint' with your actual API endpoint
            const response = await fetch('/api/editUserImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });
            const data = await response.json();
            if (response.ok) {
                setRedesignUrl(data.redesignUrl);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Tattoo Redesign</h1>
            <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
            {redesignUrl && (
                <div>
                    <h2>Redesigned Tattoo</h2>
                    <img src={redesignUrl} alt="Redesigned Tattoo" style={{ maxWidth: '100%' }} />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default TattooRedesign;
