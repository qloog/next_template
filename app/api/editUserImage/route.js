import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    const { image } = await request.json();

    // Step 1: Use GPT-4 to get a description of the image
    const gpt4Response = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 4096,
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What's in this image?" },
                    { type: "image_url", image_url: image }
                ]
            }
        ]
    });

    // Extract prompt from the GPT-4 response
    const gpt4Prompt = await extractPromptFromResponse(gpt4Response);

    // Step 2: Use the description from GPT-4 as a prompt for DALL-E 3
    const dallEResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: gpt4Prompt
    });

    // Step 3: Return the response from DALL-E 3
    return dallEResponse;
}

async function extractPromptFromResponse(response) {
    const stream = OpenAIStream(response);
    let prompt = "";

    for await (const chunk of stream) {
        prompt += chunk.toString();
    }

    // Extract the description from the response
    const description = prompt.split("What's in this image?")[1].trim();
    return description;
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



