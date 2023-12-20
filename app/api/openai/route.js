const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

router.post('/generateImage', upload.single('image'), async (req, res) => {
    const openaiApiKey = process.env.OPENAI_API_KEY; // Ensure this is set in your environment

    try {
        // Process the uploaded image for DALL-E 2 API
        // This depends on how the DALL-E 2 API expects to receive the image

        // Example: Sending image to DALL-E API (adjust according to actual API spec)
        const response = await axios.post(
            'https://api.openai.com/v2/your-dalle-endpoint', // Correct DALL-E 2 API endpoint
            {
                // Data payload including the image
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    // Other necessary headers
                }
            }
        );

        // Assuming the API returns the URL of the generated image
        res.status(200).json({ imageUrl: response.data.someUrlField });
    } catch (error) {
        console.error('Error with DALL-E API:', error);
        res.status(500).json({ message: 'Error generating image' });
    }
});

module.exports = router;
