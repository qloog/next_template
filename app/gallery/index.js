import GalleryImage from '@/models/GalleryImage';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const images = await GalleryImage.find().lean();
    res.status(200).json(images);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
