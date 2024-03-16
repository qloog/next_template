import connectMongo from '@/libs/mongoose'; // Adjust the import path as needed
import Image from '@/models/Image'; // Adjust the import path as needed
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, res) {
  await connectMongo(); // Connect to MongoDB

  if (req.method === 'POST') {
    const { image } = req.body; // Base64 encoded image data

    try {
      // Get labels from GPT-4 Vision
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Provide 3 specific labels that accurately categorize the content of this image."
              },
              {
                type: "image_base64",
                image_base64: image.split(',')[1] // Remove the data URL prefix if present
              },
            ],
          },
        ],
      });
      const labels = response.choices[0].message.content.split(', ');

      // Save image and labels in MongoDB
      const newImage = new Image({ data: image, labels });
      await newImage.save();

      res.status(201).json(newImage);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Error processing image' });
    }
  } else if (req.method === 'GET') {
    // Handle fetching of all labeled images
    try {
      const images = await Image.find({});
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
