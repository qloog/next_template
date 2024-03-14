// Import the necessary package
import OpenAI from 'openai';

// Initialize the OpenAI instance with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Assuming the body directly contains the image URL
            const { imageUrl } = req.body;

            // Prepare and send the request to the AI model
            const gpt4visionresponse = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [{
                    role: "user",
                    content: [{
                        type: "text",
                        text: "Give me 3 labels for this image not a description. I need you to assign 3 labels as best and accurately as you can for what this image is based on."
                    },
                    {
                        type: "image_url",
                        image_url: imageUrl // Use the image URL from the request
                    }]
                }],
            });

            // Send back the labels as the response
            res.status(200).json(gpt4visionresponse.data);
        } catch (error) {
            console.error("Error processing image labeling:", error);
            res.status(500).json({ error: "Error processing image labeling" });
        }
    } else {
        // Handle non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
