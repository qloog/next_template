import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function DELETE(req) {
  await connectMongo();

  const session = await getServerSession({ req }, authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { imageId } = await req.json();

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);
    if (!deletedImage) {
      return new Response(JSON.stringify({ error: 'Image not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ message: 'Image deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
