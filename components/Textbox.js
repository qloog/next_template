import React, { useState } from 'react';

const SimpleTextarea = () => {
    const [text, setText] = useState('');
    const [idea, setIdea] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = () => {
        // Here you can define what happens when the button is clicked
        // For example, generating a new idea. For now, it just sets a placeholder text
        setIdea('New idea generated!');
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Type here..."
                rows={4}
                cols={50}
            />
            <br />
            <button onClick={handleButtonClick}>Render new idea</button>
            <p>{idea}</p>
        </div>
    );
};

export default SimpleTextarea;
