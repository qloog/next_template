import multer from 'multer';
import { OpenAI } from 'openai';

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    upload.single('image')(req, res, async (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        const openai = new OpenAI(process.env.OPENAI_API_KEY);

        try {
            // Assuming req.file.path gives the path to the uploaded image
            const imageResponse = await openai.images.createVariation({
                image: fs.createReadStream(req.file.path),
            });

            // Send back the URLs of the generated images
            res.status(200).json({ images: imageResponse.data.data });
        } catch (apiError) {
            console.error('DALL-E API error:', apiError);
            res.status(500).json({ message: 'Error calling DALL-E API' });
        }
    });
}
