import axios from 'axios';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error processing the form.' });
      }

      // Read the file and convert to base64
      const file = files.image;
      const base64Image = Buffer.from(await fs.promises.readFile(file.filepath)).toString('base64');

      // Construct the payload for the OpenAI API
      const payload = {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` },
              { type: "text", text: fields.userPrompt }
            ]
          }
        ],
        max_tokens: 300
      };

      // Make a POST request to OpenAI's API
      try {
        const openAIResponse = await axios.post('https://api.openai.com/v1/engines/gpt-4-vision-preview/completions', payload, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY2}`,
            'Content-Type': 'application/json'
          }
        });

        // Extract the description text from the response
        const descriptionText = openAIResponse.data.choices[0].message.content;

        // Send the description back to the frontend
        res.status(200).json({ description: descriptionText });
      } catch (apiError) {
        console.error(apiError);
        res.status(500).json({ error: 'Error communicating with OpenAI API.' });
      }
    });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}









/* import { OpenAIStream, StreamingTextResponse } from "ai"
import { model } from "mongoose";
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

export async function POST(req) {
const { image } = await req.json()

const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "Modify the image to a better styling" }, 
                { type: "image_url", image_url: image }//base64 images
            ]
        }
    ]
});
const stream = OpenAIStream(response);

return new StreamingTextResponse(stream);


}
*/