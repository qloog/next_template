import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req) {
    try {
        const { image } = await req.json();

        // Get the description of the image
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What's in this image?" },
                        { type: "image_url", image_url: image }
                    ],
                },
            ],
        });

        const textPrompt = response.choices[0].message.content

        // Generate a new image based on the description
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: textPrompt,
            n: 1,
        });

        // Assuming the image data is in imageResponse.data
        const generatedImageUrl = imageResponse.data[0].url;

        // Return the generated image URL in the response
        return new NextResponse(JSON.stringify({ imageUrl: generatedImageUrl }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error in API:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}









/*


import OpenAI from "openai";

const openai = new OpenAI();


export async function POST(req) {
    const { image } = await req.json();
        const response = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What's in this image?"},
                {
                  type: "image_url",
                  image_url:
                    image //base64 images
                },
              ],
            },
          ],
        });
        console.log(response.choices[0]);
        const textPrompt = response.choices[0].message.content
      
        async function createDallEImage() {
          const image = await openai.images.generate({
           model: "dall-e-3", 
           prompt: textPrompt,
           n: 1,
          });
          
        
          console.log(image.data);
          
        }
        createDallEImage()
      }

*/



