import { OpenAIStream, StreamingTextResponse } from "ai"
// Import necessary modules and configurations
import { Configuration, OpenAIApi } from "openai-edge";

export const config = { runtime: 'experimental-edge' }; // Ensure this matches your deployment capabilities

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});

const openai = new OpenAIApi(configuration);

// API route handler for POST requests
export default async function handler(req, res) {
  try {
    // Parse the JSON body from the request
    const { image, modifications } = await req.json();

    // Get description of changes needed from GPT-4 Vision Preview
    const visionResponse = await openai.createChatCompletion({
      model: "gpt-4-vision-preview",
      stream: true,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Modify the image: ${modifications}`,
        },
        {
          role: "system",
          content: { type: "image_url", image_url: image },
        },
      ],
    });

    // Assume visionResponse is streamed and handle accordingly
    let description = '';
    if (visionResponse.data && visionResponse.data.length > 0) {
      // Assuming the first piece of data contains the necessary description
      description = visionResponse.data[0].choices[0].message.content.trim();
    }

    // Generate a new image with DALL·E 3 using the description
    const dalleResponse = await openai.createImage({
      model: "dall-e-3",
      prompt: description,
      size: "1024x1024",
      n: 1,
    });

    // Extract and return the URL of the new image
    if (dalleResponse.data && dalleResponse.data.length > 0) {
      const newImageUrl = dalleResponse.data[0].url;
      res.status(200).json({ newImageUrl });
    } else {
      res.status(500).json({ error: "Failed to generate new image." });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
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