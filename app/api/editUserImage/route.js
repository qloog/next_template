import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    const { image } = await request.json();

    // Step 1: Use GPT-4 Vision to get a description of the image
    const visionResponse = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        stream: false, // Changed to false for simplicity in handling the response
        max_tokens: 4096,
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What's in this image?" }, 
                    { type: "image_url", image_url: image } // Assuming 'image' is a valid URL
                ]
            }
        ]
    });

    // Extract the description from the visionResponse
    let description = visionResponse.choices[0].message.content.text; // Simplified extraction; adjust based on actual response structure
    console.log(JSON.stringify(visionResponse, null, 2));

    // Step 2: Use DALL·E 3 to generate an image based on the description
    const dalleResponse = openai.images.generate({
        model: "dall-e-3",
        prompt: description, // Use the description as the prompt
        n: 1, // Number of images to generate
        // Include any other parameters you want for the image generation
    });

    // Return the DALL·E 3 generated image(s) as response
    return new Response(JSON.stringify({ description, images: dalleResponse.data }), {
        headers: { 'Content-Type': 'application/json' },
    });
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




