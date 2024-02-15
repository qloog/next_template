import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import { OpenAI } from 'openai';

const apiKey = process.env.OPENAI_API_KEY2;
const openai = new OpenAI(apiKey);

// Helper function to convert image to base64
const encodeImageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, 'base64');
}

// Helper function to send POST request to OpenAI
const postToOpenAI = async (imageBase64) => {
  const formData = new FormData();
  formData.append('file', imageBase64, 'image.jpg');

  const response = await fetch('https://api.openai.com/v1/images', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData
  });

  return response.json();
};

// Function to get image description
export const getImageDescription = async (imageBase64) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: "Describe the style and elements of this image."
      },
      {
        role: "system",
        content: "data:image/jpeg;base64," + imageBase64
      }
    ]
  });

  return response.data.choices[0].message.content;
};

// Function to generate image
export const generateImage = async (prompt) => {
  const response = await openai.createImage({
    model: "dall-e-3",
    prompt: prompt,
    size: "1792x1024"
  });

  return response.data[0].url;
};

// Function to save image from URL
export const saveImageFromUrl = async (imageUrl, savePath) => {
  const imageResponse = await fetch(imageUrl);
  const buffer = await imageResponse.buffer();
  fs.writeFileSync(savePath, buffer);
};

// Example usage
const run = async () => {
  const imagePath = 'path_to_your_image.jpg'; // Replace with your image path
  const imageBase64 = encodeImageToBase64(imagePath);

  // Get image description
  const description = await getImageDescription(imageBase64);
  console.log(description);

  // Generate image
  const newImagePrompt = 'A description of what you want to generate'; // Replace with your prompt
  const generatedImageUrl = await generateImage(newImagePrompt);

  // Save image from URL
  const savePath = 'path_where_you_want_to_save_image.webp'; // Replace with your save path
  await saveImageFromUrl(generatedImageUrl, savePath);
};

run();








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