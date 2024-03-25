

import connectMongo from "@/libs/mongoose";
import { getSession } from 'next-auth/react';
import Image from "@/models/Image";

export async function POST(req) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const session = await getSession({ req });
    if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const designId = req.query.designId;

    await connectMongo();

    try {
        const deletedDesign = await Image.findOneAndDelete({ _id: designId, uploaderId: session.user.id });
        if (!deletedDesign) {
            return res.status(404).json({ error: 'Design not found' });
        }

        return res.status(200).json({ message: 'Design deleted successfully' });
    } catch (error) {
        console.error('Error deleting design:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
