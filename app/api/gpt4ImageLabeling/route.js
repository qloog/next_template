import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is securely stored and accessed
});

export const runtime = "experimental-edge"

export default async function handler(req) {
  try {
    // Parse the incoming request to get the image URL
    const { image } = await req.json();

    // Modify the prompt to ask for specific labels
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "I need 3 labels that best describe this image. No description and nothing else. Make sure they are as accurate as possible."
            },
            {
              type: "image_url",
              image_url: image // The image URL from the request
            },
          ],
        },
      ],
    });

    // Extract the labels provided by GPT-4
    const labels = response.choices[0].message.content;

    // Return the labels in the response
    return new NextResponse(JSON.stringify({ labels }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in API:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
