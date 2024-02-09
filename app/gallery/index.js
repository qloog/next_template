// pages/api/gallery/index.js
import dbConnect from '@/libs/mongoose';
import GalleryImage from '@/models/GalleryImage';

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const images = await GalleryImage.find({});
            res.status(200).json({ images });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch gallery images' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
