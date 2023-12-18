import React, { useState } from 'react';

const SimpleTextarea = () => {
    const [text, setText] = useState('');
    const [idea, setIdea] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = () => {
        // Define your idea generation logic here
        setIdea('Generating...');
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Type here..."
                rows={4}
                cols={50}
                style={{ marginBottom: '10px' }}
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
