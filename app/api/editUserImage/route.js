import { Configuration, OpenAIApi } from "openai-edge";

// Your API Key should be stored in .env.local for development
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
}));

// Helper function to analyze image with GPT-4 Vision
async function analyzeImageWithVision(imageData) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4-vision-preview",
      prompt: "What's in this image?",
      attachments: [
        {
          data: imageData,
          type: "image",
        },
      ],
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error in analyzeImageWithVision:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

// Helper function to generate image with DALL·E 3 based on the description
async function generateImageWithDalle(description) {
  try {
    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: description,
      n: 1, // Number of images to generate
    });
    return response.data[0].url;
  } catch (error) {
    console.error('Error in generateImageWithDalle:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { image: base64Image, userPrompt } = req.body;

  try {
    // Analyze the image with GPT-4 Vision
    const description = await analyzeImageWithVision(base64Image);

    // Ensure the template string is correctly formatted
    const combinedPrompt = `${description} ${userPrompt}`;

    // Generate image with DALL·E 3 based on the combined description
    const imageUrl = await generateImageWithDalle(combinedPrompt);

    // Return the generated image URL
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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



