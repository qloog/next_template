// pages/api/uploadToGallery.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'galleryImages.json');

  try {
    const data = fs.readFileSync(filePath);
    const images = JSON.parse(data.toString());

    // Add the new image URL
    images.push({ id: images.length + 1, url: imageUrl, alt: 'User Uploaded Tattoo Design' });

    // Save the updated array back to the file
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}
