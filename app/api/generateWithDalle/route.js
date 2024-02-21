import { Configuration, OpenAIApi } from "openai-edge"

export default async function handler(req, res) {
    if (req.method === 'POST') {
   
      const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY3,
      }));
  
      try {
        const { description } = req.body;
  
        // Ensure the description exists
        if (!description) {
          return res.status(400).json({ error: 'Description is required' });
        }
  
        // Call DALL·E 3 to generate an image based on the description
        const dalleResponse = await openai.createImage({
          model: "dall-e-3", 
          prompt: description,
          n: 1, // Generate one image
        });
  
        
        const imageUrl = dalleResponse.data[0].url; 
  
        // Return the image URL to the frontend
        res.status(200).json({ imageUrl });
      } catch (error) {
        console.error('Failed to generate image with DALL·E 3:', error);
        // Return a 500 error with a generic message or customize as needed
        res.status(500).json({ error: 'Failed to generate image' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }
  