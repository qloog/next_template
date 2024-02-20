import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY3,
  });
  const openai = new OpenAIApi(configuration);
  

// pages/api/analyzeAndGenerate.js or another file in your pages/api directory
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      // Step 1: Call GPT-4 Vision with the provided image
      const { image } = req.body; // Ensure your frontend sends the image in the request body
      const visionResponse = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What's in this image?" },
              { type: "image_url", image_url: image }
            ]
          }
        ],
      });
  
      // Extract the description from GPT-4 Vision's response
      // Adjust the path based on the actual structure of the response
      const description = visionResponse.data.choices[0].message.content;
  
      // Step 2: Use the description to generate an image with DALL·E 3
      const dalleResponse = await openai.createImage({
        model: "dall-e-3",
        prompt: description,
        n: 1, // You can adjust the number of images to generate
      });
  
      // Send the DALL·E 3 response back to the client
      // Adjust the response structure based on your needs
      res.status(200).json(dalleResponse.data);
    } catch (error) {
      console.error('Error processing the request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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



