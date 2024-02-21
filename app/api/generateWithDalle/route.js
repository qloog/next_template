import { Configuration, OpenAIApi } from "openai-edge"

// app/api/generateWithDalle/route.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end('Method Not Allowed');
    }
  
  
  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY3,
  }));

  try {
    const { description } = req.body;

    const dalleResponse = await openai.createImage({
      model: "dall-e-3",
      prompt: description,
      n: 1, // Number of images to generate, adjust as needed
    });

    const imageUrl = dalleResponse.data[0].url; // Extract the image URL from the response
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error in DALL·E 3 image generation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
