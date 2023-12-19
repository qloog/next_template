// pages/api/generateImage.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Only allow POST requests
    }

    const openaiApiKey = process.env.OPENAI_API_KEY; // Load API key from environment variables

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: req.body.prompt, // Get prompt from the request body
                n: 1, // Number of images to generate
                // Add other parameters as needed
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Send back the URL of the generated image
        res.status(200).json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error('DALL-E API error:', error);
        res.status(500).json({ message: 'Error generating image' });
    }
}
