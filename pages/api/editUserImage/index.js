// pages/api/editUserImage/index.js
import { Configuration, OpenAIApi } from "openai-edge";

// Initialize the OpenAI API client with your API key
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
}));

// Function to analyze image with GPT-4 Vision and return the analysis
async function analyzeImageWithVision(imageData) {
    try {
      const response = await openai.createCompletion({
        model: "gpt-4-vision-preview",
        prompt: "What's in this image?",
        attachments: [{ data: imageData, type: "image" }],
      });
      console.log("OpenAI API Response:", response); // Log the full response
      if (response.data.choices) {
        return response.data.choices[0].text;
      } else {
        // Handle unexpected response structure
        console.error("Unexpected response structure:", response);
        return "Error: Unexpected response structure from OpenAI API.";
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
  

// Function to generate an image with DALL·E 3 based on the description
async function generateImageWithDalle(description) {
  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: description,
    n: 1,
  });
  return response.data[0].url;
}

// API route handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { image: base64Image, userPrompt } = req.body;

  try {
    const description = await analyzeImageWithVision(base64Image);
    const combinedPrompt = `${description} ${userPrompt}`;
    const imageUrl = await generateImageWithDalle(combinedPrompt);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).send('Internal Server Error');
  }
}
