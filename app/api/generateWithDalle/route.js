import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = 'edge'; // Ensure your environment supports Edge Functions

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY3, // Different API key for DALL·E 3
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    const { description } = await request.json(); // Parse the description from the request body

    if (!description) {
        return new Response(JSON.stringify({ error: 'Description is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Call DALL·E 3 to generate an image based on the description
        const dalleResponse = await openai.createImage({
            model: "dall-e-3",
            prompt: description,
            n: 1, // Generate one image
        });
        console.log(dalleResponse);


        const imageUrl = dalleResponse.data[0].url; // Extract the image URL from the response

        // Return the image URL to the frontend
        return new Response(JSON.stringify({ imageUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to generate image with DALL·E 3:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
