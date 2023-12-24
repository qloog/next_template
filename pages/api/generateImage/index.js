
import { json } from "express";
import OpenAI from "openai";



const openai = new OpenAI();

export default async function handler(req, res) {
    const { prompt } = req.body;
    console.log(req.body);
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    const image = await openai.images.generate({
         model: "dall-e-3", 
         prompt: prompt});
    
      const imageUrl = image.data[0].url;
      const finalData = image.data
      

    res.status(200).json({ imageUrl, finalData })
    console.log(image.data);
    console.log('image', image)
}



