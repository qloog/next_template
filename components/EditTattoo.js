"use client";
import React, { useState } from 'react';

export default function Home() {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [openAIResponse, setOpenAIResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Added to prevent multiple submissions

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
        }
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prevent function from proceeding if it's already submitting or if there are missing inputs
        if (isSubmitting || !image || !prompt) {
            alert("Please wait for the current submission to finish or ensure all fields are filled.");
            return;
        }

        setIsSubmitting(true); // Prevents further submissions until the current one is processed

        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);

        try {
            const response = await fetch('/api/analyzeImage', {
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
            alert("An error occurred while processing your request.");
        } finally {
            setIsSubmitting(false); // Allows new submissions
        }
    };

    return (
        <div>
            {/* UI elements here */}
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={prompt} onChange={handlePromptChange} />
            <button onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            {openAIResponse && <p>{openAIResponse}</p>}
        </div>
    );
}
