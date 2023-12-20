// pages/api/generateImage.js
import multer from 'multer';
import axios from 'axios';

const upload = multer({ dest: 'uploads/' }); // Configure as needed

export const config = {
    api: {
        bodyParser: false, // For multer
    },
};

export default async function handler(req, res) {
    upload.single('image')(req, res, async (error) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        // req.file contains the uploaded file
        // Process and send the file to DALL-E 2 API here
        // Example: axios.post to DALL-E 2 API

        res.status(200).json({ message: 'Image processed successfully' });
    });
}
