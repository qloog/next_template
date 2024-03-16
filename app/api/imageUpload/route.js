import mongoose from 'mongoose';
import connectMongo from '@/libs/mongoose'; // Adjust the import path as needed
import Image from '@/models/Image'; // Adjust the import path as needed

// Connect to MongoDB
await connectMongo();

export async function POST(req) {
  try {
    const { image } = await req.json(); // Extract image data from the request

    // Check if the image data is provided
    if (!image) {
      throw new Error('Image data is missing');
    }

    // Create a new image document
    const newImage = new Image({ data: image });
    await newImage.save(); // Save the image document to the database

    // Return the saved image document
    return new Response(JSON.stringify(newImage), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving image:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
