import { OpenAIStream, StreamingTextResponse } from "ai"
import { response } from "express";
import { model } from "mongoose";
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

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

