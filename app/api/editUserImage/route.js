import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai-edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the incoming request
      const { image, userPrompt } = req.body;

      // Get image description from GPT-4 Vision Preview
      const descriptionResponse = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: "Image description request."
          },
          {
            role: "user",
            content: { type: "image_url", image_url: image }
          }
        ],
      });

      const imageDescription = descriptionResponse.data.choices[0].message.content;

      // Generate a new image with DALL·E 3 using the image description and user's prompt
      const generateResponse = await openai.createImage({
        model: "dall-e-3",
        prompt: `${imageDescription}. ${userPrompt}`,
        n: 1,
        size: "1024x1024"
      });

      const generatedImageUrl = generateResponse.data[0].url;

      // Return the new image URL
      res.status(200).json({ url: generatedImageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing your request.' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

















/* import { OpenAIStream, StreamingTextResponse } from "ai"
import { model } from "mongoose";
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

export async function POST(req) {
const { image } = await req.json()

const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "Modify the image to a better styling" }, 
                { type: "image_url", image_url: image }//base64 images
            ]
        }
    ]
});
const stream = OpenAIStream(response);

return new StreamingTextResponse(stream);


}
*/