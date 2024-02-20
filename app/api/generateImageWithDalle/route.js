// Assuming you are using Next.js for your API routes
import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Your OpenAI API key should have access to DALL·E 3
  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY2,
  }));

  try {
    const { description } = req.body;

    // Using the description obtained from GPT-4 Vision as the prompt for DALL·E 3
    const response = await openai.createImage({
      model: "dall-e-3", // Ensure you're using the correct model identifier
      prompt: description,
      n: 1, // Number of images to generate, adjust as needed
    });

    // Assuming the response includes the URL or data of the generated image
    // The structure of `response.data` depends on OpenAI's response format
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating image with DALL·E 3:', error);
    res.status(500).json({ message: 'Error generating image with DALL·E 3' });
  }
}
