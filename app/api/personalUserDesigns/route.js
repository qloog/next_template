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
      // Retrieve designs uploaded by the current user
      const designs = await Design.find({ userId: session.user.id }).sort({ createdAt: -1 }).exec();
      return new Response(JSON.stringify(designs), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching user designs:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch user designs' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
