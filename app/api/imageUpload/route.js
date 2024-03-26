import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getLabelsFromGPT4Vision(image) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "List three labels that categorize this image. Make them super accurate and do not give any labels that are long or description wise. Also, for example, if I upload a picture of a Greek god like Zeus, labels should be like 'Zeus, Greek god, mythology', no description at all. Ensure the 3 labels are as accurate as possible and you're sure they're correct."},
          { type: "image_url", image_url: image }
        ],
      },
    ],
  });

  const labels = response.choices[0].message.content.split(', ').map(label => label.trim());
  return labels;
}

export async function POST(req, res) {
  await connectMongo();
  const session = await getServerSession({ req }, authOptions);
  const userEmail = session?.user?.email;
  const { image } = await req.json();

  try {
    const labels = await getLabelsFromGPT4Vision(image);
    const newImage = new Image({ data: image, labels, userEmail });
    await newImage.save();
    res.status(201).json({ imageId: newImage._id, labels, message: 'Image processed successfully' });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
}

export async function GET(req, res) {
  await connectMongo();
  const session = await getServerSession({ req }, authOptions);
  const userEmail = session?.user?.email;

  try {
    const images = userEmail ? await Image.find({ userEmail }) : await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}






/* 
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getLabelsFromGPT4Vision(image) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "List three labels that categorize this image. Make them super accurate and do not give any labels that are long or description wise. Also, for example, if i upload picture of a greek god like zeus, labels should be like 'zeus, greek god, mythology', no description at all. ensure the 3 labels are as accurate as possible and you're sure they're correct"},
              { type: "image_url", image_url: image }
            ],
          },
        ],
      });

  // Assuming the response format is correct and contains the expected data
  const labels = response.choices[0].message.content.split(', ');
  return labels;
}

export async function POST(req) {
  await connectMongo();

  const { image } = await req.json();

  try {
    // Check if an image with the same data already exists
    const existingImage = await Image.findOne({ data: image });
    if (existingImage) {
      // If image already exists, just return it
      return new Response(JSON.stringify(existingImage), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get labels from GPT-4 Vision
    const labels = await getLabelsFromGPT4Vision(image);

    // Save image and labels in MongoDB
    const newImage = new Image({ data: image, labels });
    await newImage.save();

    return new Response(JSON.stringify({ imageId: newImage._id, labels, message: 'Image processed successfully' }), {
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