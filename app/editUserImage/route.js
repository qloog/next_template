import multer from 'multer';
import OpenAI from 'openai';
import express from 'express';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file; // This is your image file
    const modificationRequest = req.body.modificationRequest;

    // Use OpenAI's API to modify the image here.
    // This is a placeholder for where you'd call the OpenAI API.
    // You'll need to adjust this according to the OpenAI API documentation
    // and how it supports image modification.
    const response = await openai.createCompletion({
      model: "gpt-4-vision-preview",
      prompt: modificationRequest,
      // Add additional parameters as required by the OpenAI API for image processing
    });

    // Assuming the OpenAI API returns a URL to the modified image
    const modifiedImageUrl = response.data.choices[0].text; // Adjust based on actual response structure

    res.status(200).json({ modifiedTattooUrl: modifiedImageUrl });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
