import { NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function DELETE(req) {
  await connectMongo();

  const session = await getServerSession(req, authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { imageId } = body;

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
