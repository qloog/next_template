

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import { authOptions } from '@/libs/next-auth';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';


export default async function handler(req) {
  await connectMongo();

  const session = await getServerSession(req, authOptions);

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { imageId } = req.body;

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return new NextResponse(JSON.stringify({ error: 'Image not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify({ message: 'Image deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete image' }), { status: 500 });
  }
}
