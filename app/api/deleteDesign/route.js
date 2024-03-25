import connectMongo from "@/libs/mongoose";
import { getSession } from 'next-auth/react';
import Image from "@/models/Image";
import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const session = await getSession({ req });
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { designId } = req.query;

    await connectMongo();

    try {
        const deletedDesign = await Image.findOneAndDelete({ _id: designId, uploaderId: session.user.id });
        if (!deletedDesign) {
            return NextResponse.json({ error: 'Design not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Design deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting design:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
