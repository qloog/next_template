import React from 'react';

const ImageCard = ({ imageUrl, description }) => {
    if (!imageUrl) return null;

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <img src={imageUrl} alt="Generated Tattoo" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block', margin: '0 auto' }} />
            {description && <p style={{ textAlign: 'center' }}>{description}</p>}
        </div>
    );
};

export default ImageCard;
