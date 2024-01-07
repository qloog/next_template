import { json } from "express";
import OpenAI from "openai";
import User from '@/models/User';

const openai = new OpenAI
   

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    

    const { prompt } = req.body;
    console.log(req.body);


    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    try {
        const user = await User.findOne({ /* criteria to find the user */ });
        if (!user || !user.hasAccess || user.imageCount >= getMaxImages(user.planType)) {
            return res.status(403).json({ error: "Access denied or limit reached" });
        }

        console.log("Calling OpenAI API");
        const image = await openai.images.generate({
            model: "dall-e-3", 
            prompt: prompt});
            console.log("OpenAI API response received");
       
         const imageUrl = image.data[0].url;
         const finalData = image.data
         
         user.imageCount += 1;
         await user.save();

       res.status(200).json({ imageUrl, finalData })

    }

    catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Error generating image', details: error.message });
    }

    function getMaxImages(planType) {
        switch (planType) {
            case 'beginner': return 20;
            case 'veteran': return 50;
            case 'premium': return 100;
            default: return 20;
        }
    
    }
  
}