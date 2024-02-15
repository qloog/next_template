// File: /pages/api/editUserImage.js
import axios from 'axios';
import formidable from 'formidable-serverless';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Only POST requests are allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error processing the form.' });
    }

    // Read the image file and convert to base64
    const fileBuffer = fs.readFileSync(files.image.filepath);
    const base64Image = fileBuffer.toString('base64');

    // Use the base64 image and user prompt to call OpenAI's GPT-4 Vision API
    try {
      // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
      const headers = {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY2`,
        'Content-Type': 'application/json'
      };

      // Call the GPT-4 Vision API to get a description of the image
      const visionResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-4-vision-preview/completions', {
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "system",
              content: "Image description request."
            },
            {
              role: "user",
              content: { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` }
            },
            {
              role: "user",
              content: fields.userPrompt
            }
          ],
          max_tokens: 300
        }, 
        { headers }
      );

      // Extract the image description from the response
      const imageDescription = visionResponse.data.choices[0].message.content;

      // Call DALL·E 3 API to generate a new image using the description
      const dalleResponse = await axios.post(
        'https://api.openai.com/v1/images/generations', 
        {
          model: "dall-e-3",
          prompt: imageDescription,
          n: 1,
          size: "1024x1024"
        }, 
        { headers }
      );

      // Extract the URL of the generated image
      const generatedImageUrl = dalleResponse.data.data[0].url;

      // Send the generated image URL back to the frontend
      res.status(200).json({ newImageUrl: generatedImageUrl });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Error interacting with OpenAI API.' });
    }
  });
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