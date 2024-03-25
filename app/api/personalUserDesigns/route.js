// pages/api/personalUserDesigns.js

import connectMongo from "@/libs/mongoose";
import { getSession } from 'next-auth/react';
import Image from "@/models/Image";

export const maxDuration = 120;
export const dynamic = "force-dynamic"

export async function POST(req) {
    // Your POST logic here
    // This is just a template; adjust it according to your actual implementation for posting an image

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
        // Assuming you have data to insert into the database.
        // You will get this data from `req.body` after parsing it.

        const data = req.body; // Make sure to validate and sanitize this data.
        const newImage = new Image({ ...data, uploaderId: session.user.id }); // Add other required fields as necessary.
        await newImage.save();

        return new Response(JSON.stringify(newImage), {
            status: 201,
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
    console.log("Session:", session); // Log the session to see what's inside

    if (!session || !session.user) {
        console.log("No session or user found"); // Log if no session or user is found
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    await connectMongo();

    try {
        const images = await Image.find({ uploaderId: session.user.id }).sort({ createdAt: -1 });
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