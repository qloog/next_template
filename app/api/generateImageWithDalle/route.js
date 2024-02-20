import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2 // Make sure this key has access to DALL·E 3
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    const { description } = await request.json(); // Extract the description from the request body

    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: description,
        n: 1, // Adjust based on how many images you want to generate
        // Include any other parameters necessary for your request
    });

    // Return the generated image(s) as a response
    return new Response(JSON.stringify(response.data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
