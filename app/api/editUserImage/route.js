import { Configuration, OpenAIApi } from "openai-edge"

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

async function analyzeImageWithVision(imageData) {
  const response = await openai.createCompletion({
    model: "gpt-4-vision-preview",
    prompt: "What's in this image?",
    attachments: [{ data: imageData, type: "image" }],
  });
  return response.data.choices[0].text;
}

async function generateImageWithDalle(description) {
  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: description,
    n: 1,
  });
  return response.data[0].url;
}

export default async function handler(req, res) {
  let base64Image, userPrompt;

  // Handling different methods differently
  switch (req.method) {
    case 'POST':
      // For POST requests, expect the payload in the body
      ({ image: base64Image, userPrompt } = req.body);
      break;
    case 'GET':
    case 'PUT':
      // For GET or PUT requests, you might expect parameters in the query string or body
      // Here's an example for query string parameters
      base64Image = req.query.image;
      userPrompt = req.query.userPrompt;
      // For PUT, you might use req.body similar to POST
      if (req.method === 'PUT') {
        ({ image: base64Image, userPrompt } = req.body);
      }
      break;
    default:
      // If the method is not one of the above, return a 405
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // The same logic for processing the image and generating a response
    const description = await analyzeImageWithVision(base64Image);
    const combinedPrompt = `${description} ${userPrompt}`;
    const imageUrl = await generateImageWithDalle(combinedPrompt);

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



