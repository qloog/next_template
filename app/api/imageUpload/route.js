

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

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