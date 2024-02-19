import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2,
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    const { image } = await request.json();

    // Step 1: Get description from GPT-4 Vision
    const visionResponse = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 4096,
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What's in this image?" },
                    { type: "image_url", image_url: image } // base64 images
                ]
            }
        ]
    });
    const visionStream = OpenAIStream(visionResponse);

    let description = '';
    for await (const message of visionStream) {
        if (message.role === 'system' && message.content) {
            description += message.content.text; // Assuming this accumulates the description
        }
    }

    // Step 2: Generate an image with DALL·E 3 based on the description
    if (description) {
        const dalleResponse = await openai.createImage({
            model: "dalle-3",
            prompt: description,
            n: 1, // Number of images to generate
            // Include any other parameters you want for the image generation
        });

        // Assuming dalleResponse includes the generated image(s), return this as your response
        return new Response(JSON.stringify({ images: dalleResponse.data.images }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ error: 'No description found from GPT-4 Vision.' }), {
            headers: { 'Content-Type': 'application/json' },
        });
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



