import React, { useState } from 'react';

const SimpleTextarea = () => {
    const [text, setText] = useState('');
    const [idea, setIdea] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = () => {
        // Define your idea generation logic here
        setIdea('New idea generated!');
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Type here..."
                rows={4}
                style={{ 
                    width: '100%',
                    maxWidth: '500px',
                    marginBottom: '10px',
                    resize: 'vertical',
                    backgroundColor: '#f5f5f5', // Very light grey background
                    color: 'white', // White text color
                    border: 'none',
                    padding: '10px'
                }}
            />
            <br />
            <button
                onClick={handleButtonClick}
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '30px',
                    padding: '10px 20px',
                    cursor: 'pointer'
                }}
            >
                Render new idea
            </button>
            <p>{idea}</p>
        </div>
    );
};

export default SimpleTextarea;
