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
          {
            type: "text",
            text: "List three labels that categorize this image. Make them super accurate and do not give any labels that are long or description wise. Also, for example, if I upload a picture of a Greek god like Zeus, labels should be like 'Zeus, Greek god, mythology', no description at all. Ensure the 3 labels are as accurate as possible and you're sure they're correct"
          },
          {
            type: "image_url",
            image_url: image
          }
        ],
      },
    ],
  });

  const labels = response.choices[0].message.content.split(', ');
  return labels;
}

export async function POST(req) {
  await connectMongo();

  const { image } = await req.json();

  try {
    const existingImage = await Image.findOne({ data: image });
    if (existingImage) {
      return new Response(JSON.stringify(existingImage), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const labels = await getLabelsFromGPT4Vision(image);

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
    // Images are now sorted by createdAt in descending order, so the newest images come first
    const images = await Image.find({}).sort({ createdAt: -1 }).exec();
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
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export async function POST(req) {
    await connectMongo();

    const { image } = await req.json();

    try {
        // Call GPT-4 Vision API to get labels for the image
        const labels = await getLabelsFromGPT4Vision(image);

        // Create a new image document with the image data and labels
        const newImage = new Image({ data: image, labels: labels });
        await newImage.save();

        return new Response(JSON.stringify(newImage), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error saving image:', error);
        return new Response(JSON.stringify({ error: 'Error saving image' }), {
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

// Function to call GPT-4 Vision API and get labels for the image
export async function getLabelsFromGPT4Vision(image) {
    // Replace 'YOUR_GPT4_VISION_API_ENDPOINT' with your GPT-4 Vision API endpoint
    // Replace 'YOUR_API_KEY' with your API key
    const response = await fetch('https://tattooswithai.com/api/gpt4ImageLabeling', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            apiKey: process.env.OPENAI_API_KEY,
        },
        body: JSON.stringify({ image: image }),
    });

    if (!response.ok) {
        throw new Error('Failed to get labels from GPT-4 Vision API');
    }

    const data = await response.json();
    return data.labels; // Assuming the response contains a 'labels' array
}

*/ 