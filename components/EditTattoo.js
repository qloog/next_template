
import React, { useState } from 'react';

function EditTattoo() {
    const [inputText, setInputText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/editUserImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: inputText }),
            });

            const data = await response.json();
            console.log(data);
            // Handle the response, e.g., display the edited image
        } catch (error) {
            console.error('Error editing image:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your edits here"
            />
            <button type="submit">Submit Edit Request</button>
        </form>
    );
}

export default EditTattoo;
