import { Configuration, OpenAIApi } from "openai-edge";

// Initialize the OpenAI API client with your API key
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
}));

console.log("OpenAI API client initialized.");

// Analyzes an image using GPT-4 Vision and returns the analysis result
async function analyzeImageWithVision(imageData) {
  console.log("Analyzing image with GPT-4 Vision...");
  const response = await openai.createCompletion({
    model: "gpt-4-vision-preview",
    prompt: "What's in this image?",
    attachments: [{ data: imageData, type: "image" }],
  });
  console.log("Analysis complete:", response.data.choices[0].text);
  return response.data.choices[0].text;
}

// Generates an image based on a description using DALL·E 3 and returns the image URL
async function generateImageWithDalle(description) {
  console.log("Generating image with DALL·E 3 based on description:", description);
  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: description,
    n: 1,
  });
  console.log("Image generation complete, URL:", response.data[0].url);
  return response.data[0].url;
}

// API route handler to process POST requests
export default async function handler(req, res) {
  console.log("Received request:", req.method, req.path);
  // Only allow POST requests; return a 405 error for other methods
  if (req.method !== 'POST') {
    console.log("Method not allowed for this route.");
    return res.status(405).send('Method Not Allowed');
  }

  // Extract the image data and user prompt from the request body
  const { image: base64Image, userPrompt } = req.body;
  console.log("Request body extracted, image data size:", base64Image.length, "User prompt:", userPrompt);

  try {
    // Analyze the image with GPT-4 Vision
    const description = await analyzeImageWithVision(base64Image);
    // Combine the vision's response with the user's prompt
    const combinedPrompt = `${description} ${userPrompt}`;
    console.log("Combined prompt for image generation:", combinedPrompt);
    // Generate an image with DALL·E 3 based on the combined description
    const imageUrl = await generateImageWithDalle(combinedPrompt);
    console.log("Generated image URL:", imageUrl);
    // Return the generated image URL in the response
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).send('Internal Server Error');
  }
}



/*

import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

export async function POST(request) {
const { image } = await request.json()

const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "What's in this image?" }, 
                { type: "image_url", image_url: image }//base64 images
            ]
        }
    ]
});
const stream = OpenAIStream(response);

return new StreamingTextResponse(stream);

}

*/


