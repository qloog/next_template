export const maxDuration = 120
export const dynamic = "force-dynamic"

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  await connectMongo();

  const { image } = await req.json();

  try {

    // Get labels from GPT-4 Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Provide 3 specific labels that accurately categorize the content of this image." },
            { type: "image_url", image_url: image }
          ],
        },
      ],
    });
    const labels = response.choices[0].message.content.split(', ');

    // Save image and labels in MongoDB
    const newImage = new Image({ data: image, labels });
    await newImage.save();

    return new Response(JSON.stringify(newImage), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return new Response(JSON.stringify({ error: 'Error processing image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req) {
  await connectMongo();

  try {
    const images = await Image.find({});
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}




/*
export const maxDuration = 120
export const dynamic = "force-dynamic"

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  await connectMongo();

  const { image } = await req.json();

  try {
    const testImage = new Image({ data: image, labels: ['label1', 'label2', 'label3'] });
    await testImage.save();
    console.log('Test image saved with hardcoded labels');

    // Get labels from GPT-4 Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Provide 3 specific labels that accurately categorize the content of this image." },
            { type: "image_url", image_url: image }
          ],
        },
      ],
    });
    const labels = response.choices[0].message.content.split(', ');

    // Save image and labels in MongoDB
    const newImage = new Image({ data: image, labels });
    await newImage.save();

    return new Response(JSON.stringify(newImage), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return new Response(JSON.stringify({ error: 'Error processing image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req) {
  await connectMongo();

  try {
    const images = await Image.find({});
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
*/