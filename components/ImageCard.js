import React from 'react';

const ImageCard = ({ imageUrl, description }) => {
    if (!imageUrl) return null;

    const cardStyle = {
        border: '1px solid rgba(255, 255, 255, 0.8)', // White border with 80% opacity
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        textAlign: 'center',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '300px',
        display: 'block',
        margin: '0 auto',
    };

    return (
        <div style={cardStyle}>
            <img src={imageUrl} alt="Generated Tattoo" style={imageStyle} />
            {description && <p>{description}</p>}
        </div>
    );
};

export default ImageCard;
