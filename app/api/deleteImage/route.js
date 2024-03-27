import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await connectMongo();

  const session = await getServerSession({ req }, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { imageId } = req.body;

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ error: 'Failed to delete image' });
  }
}
