// pages/api/personalUserDesigns.js

import connectMongo from "@/libs/mongoose";
import { getSession } from 'next-auth/react';
import Image from "@/models/Image";

export const maxDuration = 120;
export const dynamic = "force-dynamic"

export async function POST(req) {
    const session = await getSession({ req });

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        await connectMongo();
        // Dummy response for demonstration
        return new Response(JSON.stringify([{ _id: '1', data: 'https://example.com/design1.jpg', uploaderId: session.user.id }]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function GET(req) {
    const session = await getSession({ req });

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    await connectMongo();

    try {
        // Retrieve images uploaded by the current user
        const images = await Image.find({ uploaderId: session.user.id }).sort({ createdAt: -1 }).exec();
        return new Response(JSON.stringify(images), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching user images:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user images' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
