// app/api/gallery/index.js
import connectMongo from '@/libs/mongoose';
import GalleryImage from '@/models/GalleryImage'; // Adjust the path as necessary

export default async function handler(req, res) {
  await connectMongo(); // Ensure the database connection is established

  if (req.method === 'GET') {
    try {
      const galleryImages = await GalleryImage.find({}); // Fetch all images, adjust query as needed
      res.status(200).json(galleryImages);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      res.status(500).json({ message: 'Failed to fetch gallery images' });
    }
  } else {
    // Handle other methods or return a 405 Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
