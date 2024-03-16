import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import ImageModel from '@/models/Image'; // Update the import path to your Image model

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Connect to MongoDB once at the start
const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return;
  // Replace '<Your MongoDB connection string>' with your actual connection string
  await mongoose.connect('mongodb+srv://rajvirnahar1:123qwer7R@cluster0.5qlbfj3.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export async function POST(req) {
    await connectMongo(); // Make sure MongoDB is connected
    
    try {
        const { image } = await req.json();

        // Get labels from GPT-4 Vision
        const response = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: "Label this image with three descriptive tags."
            },
            {
              role: "system",
              content: {
                image_url: image // The image URL provided in the request
              }
            },
          ],
        });

        const labels = response.choices[0].message.content.split(', ');

        // Create and save the image with labels to MongoDB
        const newImage = new ImageModel({ url: image, labels });
        await newImage.save();

        // Return the new image with labels in the response
        return new NextResponse(JSON.stringify(newImage), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error processing the image:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
