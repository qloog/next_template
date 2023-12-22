import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
    if (!imageUrl) {
        return null; // Don't render anything if no image URL is provided
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.8)', // White border with 80% opacity
        padding: '20px',
        marginTop: '20px',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0', // Light grey background
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '400px', // Set a max height for the image
        borderRadius: '8px',
    };

    return (
        <div style={containerStyle}>
            <img src={imageUrl} alt="Generated Content" style={imageStyle} />
        </div>
    );
};

export default ImageDisplay;
