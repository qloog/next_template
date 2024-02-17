import { openai } from "openai-edge";

export async function POST(req) {
    const { prompt } = req.body;

    try {
        // Generate an image based on the prompt using DALL-E 3 model
        const editDesign = await openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt,
        });

        // Assuming editDesign contains the generated image data, you can send it back to the client
        return {
            status: 200,
            body: editDesign // Assuming editDesign is the generated image data
        };
    } catch (error) {
        // Handle errors appropriately
        console.error("Error generating image with DALL-E 3:", error);
        return {
            status: 500,
            body: "Internal Server Error"
        };
    }
}

