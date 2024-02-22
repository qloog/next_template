/*
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY3
})

const openai = new OpenAIApi(configuration);

export async function POST(req) {
    try {
        const { description } = req.body;

        if (!description) {
            return new Response(JSON.stringify({ error: 'Description is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const dalleResponse = await openai.createImage({
            model: "dall-e-3",
            prompt: description,
            n: 1,
        });

        // Since you're directly using `await openai.createImage`, ensure this method correctly matches your SDK's API.
        // If the OpenAI SDK you're using differs from this, adjust the method call accordingly.

        const jsonResponse = await dalleResponse.json(); // Parse the JSON response

        if (jsonResponse.error) {
            console.error('OpenAI Error:', jsonResponse.error);
            return new Response(JSON.stringify({ error: 'Failed to generate image with DALL·E 3: ' + jsonResponse.error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const imageUrl = jsonResponse.data[0]?.url;
        if (!imageUrl) {
            console.error('No image URL found in response');
            return new Response(JSON.stringify({ error: 'Failed to generate image: No URL found' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

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
*/