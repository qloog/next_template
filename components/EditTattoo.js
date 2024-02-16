import React, { useState } from 'react';

export default function EditTattoo() {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [openAIResponse, setOpenAIResponse] = useState('');

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image || !prompt) {
            alert("Please upload an image and enter a prompt.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);

        try {
            const response = await fetch('/api/editUserImage', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOpenAIResponse(data.response);
        } catch (error) {
            console.error("Error posting image:", error);
        }
    };

    return (
        <div>
            {/* Your UI code here */}
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={prompt} onChange={handlePromptChange} />
            <button onClick={handleSubmit}>Submit</button>
            {openAIResponse && <p>{openAIResponse}</p>}
        </div>
    );
}
