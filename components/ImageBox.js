import React from 'react';



const GeneratedImageCard = ({ finalData, isLoading }) => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #e2e8f0', // Lighter and more subtle border
        padding: '20px',
        marginTop: '20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff', // Light background to distinguish the card
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        maxWidth: '90%',
    };
   


    const imageStyle = {
        width: '100%', // Makes image responsive
        maxHeight: '400px',
        borderRadius: '8px',
        objectFit: 'cover', // Ensures the image covers the area nicely without distortion
    };
    
    return (
        <div style={cardStyle}>
        {isLoading ? (
            <p>Designing...</p>
        ) : finalData ? (
            <img src={finalData} alt="Generated Tattoo" style={imageStyle} />
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
                <p>No tattoo designed yet</p>
                {/* Optionally, add an icon or placeholder here */}
            </div>
        )}
    </div>
    );

};



export default GeneratedImageCard;
