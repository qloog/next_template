import connectMongo from '@/libs/mongoose'; // Adjust the import path as needed
import Image from '@/models/Image'; // Adjust the import path as needed
import OpenAI from 'openai';
import formidable from 'formidable';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req, res) {
  await connectMongo(); // Connect to MongoDB

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ error: 'Form parsing error' });
      }

      const image = files.image; // Assuming the file input name is "image"
      if (!image) {
        return res.status(400).json({ error: 'Image is required' });
      }

      // Convert image to base64
      const base64Image = Buffer.from(image.filepath).toString('base64');

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
                  image_base64: base64Image,
                },
              ],
            },
          ],
        });
        console.log('GPT-4 Vision response:', response);
        const labels = response.choices[0].message.content.split(', ');
        

        // Save image and labels in MongoDB
        const newImage = new Image({ data: base64Image, labels });
        await newImage.save();

        res.status(201).json(newImage);

      } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
