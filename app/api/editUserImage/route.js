// Import the OpenAI package
import OpenAI from 'openai';

// Your Next.js API route handler
export default async function handler(req, res) {
  // Ensure it's a POST request
  if (req.method === 'POST') {
    try {
      // Initialize OpenAI with your API key
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Make the request to OpenAI's API
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What’s in this image?" },
              {
                type: "image_url",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            ],
          },
        ],
      });

      // Log the response and send it back to the client
      res.status(200).json(response.choices[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing your request');
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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



