const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Helper function to encode image to base64
const encodeImageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'base64' });
};

// Function to get image description
const getImageDescription = async (base64Image) => {
  const response = await axios.post('https://api.openai.com/v1/engines/gpt-4-vision-preview/completions', {
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the style and elements of this image and from the description" },
          { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` }
        ]
      }
    ],
    max_tokens: 300
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY2}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content;
};

// Function to generate an image
const generateImage = async (prompt) => {
  const response = await axios.post('https://api.openai.com/v1/images/generations', {
    model: "dall-e-3",
    prompt: prompt,
    size: "1792x1024",
    quality: "standard",
    n: 1
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY2}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.data[0].url;
};

// Function to save image from URL
const saveImageFromUrl = async (url, originalFilename) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'binary');
  const webpFilename = path.join(__dirname, 'covers', `${path.parse(originalFilename).name}.webp`);

  await sharp(imageBuffer)
    .toFormat('webp')
    .toFile(webpFilename);

  return webpFilename;
};

// Example usage:
const base64Image = encodeImageToBase64('path_to_your_image.jpg');
getImageDescription(base64Image)
  .then(description => {
    console.log('Image description:', description);
    return generateImage(description);
  })
  .then(generatedImageUrl => {
    console.log('Generated image URL:', generatedImageUrl);
    const originalFilename = 'your_image_name.jpg'; // Change this to your actual filename
    return saveImageFromUrl(generatedImageUrl, originalFilename);
  })
  .then(savedImagePath => {
    console.log('Saved image path:', savedImagePath);
  })
  .catch(error => {
    console.error('Error:', error);
  });














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