import React, { useState } from 'react';

const SimpleTextarea = () => {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <textarea
            value={text}
            onChange={handleChange}
            placeholder="Type here..."
            rows={4}
            cols={50}
        />
    );
};

export default SimpleTextarea;
