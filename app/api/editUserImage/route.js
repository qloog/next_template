import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from '@/libs/mongoose';
import User from '@/models/User';

export const maxDuration = 120;

const openai = new OpenAI();

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = session.user;

    await connectMongo();

    const user = await User.findById(id);

    if (!user || !user.currentCredits || user.currentCredits === 0) {
        return NextResponse.json({ error: 'Not enough credits' }, { status: 403 });
    }

    try {
        const { image, prompt } = await req.json();

        // Get the description of the image with a more detailed and specific prompt
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Provide a detailed description of the elements in this image, focusing on the main subject and any specific details that should be preserved or modified." },
                        { type: "image_url", image_url: image }
                    ],
                },
            ],
        });

        const detailedDescription = response.choices[0].message.content;
        const combinedPrompt = `${detailedDescription}. Based on the user's request: ${prompt}`;

        // Generate a new image based on the detailed description and user's prompt
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: combinedPrompt,
            n: 1,
        });

        // Assuming the image data is in imageResponse.data
        const generatedImageUrl = imageResponse.data[0].url;

        // Deduct one credit from the user's account
        user.currentCredits = user.currentCredits - 1;
        await user.save();

        // Return the generated image URL in the response
        return NextResponse.json({ imageUrl: generatedImageUrl });
    } catch (error) {
        console.error('Error in API:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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



