import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const { image, modifications } = await req.json();

  // First, get the description of the changes needed from GPT-4 Vision Preview
  const visionResponse = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: modifications }, // User's description of the changes
          { type: "image_url", image_url: image } // User's original image
        ]
      }
    ]
  });

  // Stream the vision API response and extract the content
  const visionStream = OpenAIStream(visionResponse);
  let description = '';
  for await (const data of visionStream) {
    if (data.choices && data.choices.length > 0) {
      description = data.choices[0].message.content.trim();
      break; // We break after the first response since we only need the description
    }
  }

  // Now, use the description to generate a new image with DALL·E 3
  const dalleResponse = await openai.createImage({
    model: "dall-e-3",
    prompt: description,
    size: "1024x1024", // Change this to the desired size
    quality: "standard",
    n: 1
  });

  // Extract the URL of the new image
  const newImageUrl = dalleResponse.data[0].url;

  // Return the URL of the new image
  return new Response(JSON.stringify({ newImageUrl }), {
    headers: { 'Content-Type': 'application/json' }
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