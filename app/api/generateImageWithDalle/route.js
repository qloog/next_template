// pages/api/generateImageWithDalle.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Initialize the OpenAI API with your API key
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY3,
    }));

    try {
      // Extract the description from the request body
      const { description } = req.body;

      // Use the description to generate an image with DALL·E 3
      const response = await openai.createImage({
        model: "dall-e-3", // Make sure you're using the correct model identifier
        prompt: description,
        n: 1, // Adjust the number of images to generate as needed
      });

      // Assuming the response contains the URL or data of the generated image
      // Respond with the data from the OpenAI API call
      res.status(200).json(response.data);
    } catch (error) {
      // Log and respond with any errors that occur during the API call
      console.error('Error generating image with DALL·E 3:', error);
      res.status(500).json({ message: 'Error generating image with DALL·E 3' });
    }
  } else {
    // If the request method is not POST, set the Allow header and return a 405 status
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
