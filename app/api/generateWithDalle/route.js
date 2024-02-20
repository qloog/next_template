// pages/api/generateWithDalle.js
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
    // Ensure we're dealing with a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Initialize the OpenAI client
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY3,
    }));

    try {
        // Parse the description from the request body
        const { description } = req.body;

        // Call DALL·E 3 to generate an image based on the description
        const dalleResponse = await openai.createImage({
            model: "dall-e-3",
            prompt: description,
            n: 1, // Adjust as needed
            // Add any other parameters as required for your use case
        });

        // Assuming the DALL·E 3 API response includes the image URL or data
        const imageUrl = dalleResponse.data[0].url; // Adjust based on actual response structure

        // Return the image URL to the frontend
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Failed to generate image with DALL·E 3:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
