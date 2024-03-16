import connectMongo from '@/libs/mongoose'; // Ensure this path is correct
import Image from '@/models/Image'; // Ensure this path is correct

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  await connectMongo(); // Connect to your MongoDB

  const { image } = req.body; // The Base64 encoded image string

  try {
    const newImage = new Image({ data: image });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Error saving image to database' });
  }
}

// Increase the default size limit for JSON body parsing if needed

