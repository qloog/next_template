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
async function getLabelsFromGPT4Vision(image) {
    // Replace 'YOUR_GPT4_VISION_API_ENDPOINT' with your GPT-4 Vision API endpoint
    // Replace 'YOUR_API_KEY' with your API key
    const response = await fetch('/api/gpt4ImageLabeling', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             apiKey: process.env.OPENAI_API_KEY2,
        },
        body: JSON.stringify({ image: image }),
    });

    if (!response.ok) {
        throw new Error('Failed to get labels from GPT-4 Vision API');
    }

    const data = await response.json();
    return data.labels; // Assuming the response contains a 'labels' array
}



/* 
import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export async function POST(req) {
    await connectMongo();

    const { image } = await req.json();

    try {
        const newImage = new Image({ data: image });
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
*/ 