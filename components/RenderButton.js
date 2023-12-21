import React from 'react';

const RenderButton = ({ onClick }) => {
    const buttonStyle = {
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px', // Gives an oval shape
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px'
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            Render New Idea
        </button>
    );
};

export default RenderButton;
