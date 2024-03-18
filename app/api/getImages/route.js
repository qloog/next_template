// /api/getImages.js

import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';

export async function GET(req) {
  await connectMongo();

  try {
    const images = await Image.find({});
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
