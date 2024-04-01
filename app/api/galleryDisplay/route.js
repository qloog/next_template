import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function GET({ url }) {
  await connectMongo();

  // Get query parameters for pagination
  const params = new URLSearchParams(url.search);
  const page = parseInt(params.get('page')) || 1;
  const limit = parseInt(params.get('limit')) || 30; // Default to 30 images per page
  const skip = (page - 1) * limit;

  try {
    const images = await Image.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    return new Response(JSON.stringify({ images, totalPages }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}








/*
import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function GET() {
  await connectMongo();

  try {
    const images = await Image.find();
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
*/