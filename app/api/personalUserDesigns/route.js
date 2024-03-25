import { NextResponse } from 'next/server';
import connectMongo from "@/libs/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import User from "@/models/User";
// Import your Design model or equivalent here

export async function POST(req) {
    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectMongo();
        // Fetch user designs from the database
        // const userDesigns = await Design.find({ userId: session.user.id });
        // return NextResponse.json(userDesigns);

        // Dummy response for demonstration
        return NextResponse.json([{ _id: '1', data: 'https://example.com/design1.jpg', uploaderId: session.user.id }]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
