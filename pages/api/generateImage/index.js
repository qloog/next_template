
import { json } from "express";
import OpenAI from "openai";



const openai = new OpenAI();

export default async function handler(req, res) {
    const image = await openai.images.generate({
         model: "dall-e-3", 
         prompt: "sikh warrior tattoo in a war but make it look very realistic"});
    
      const imageUrl = image.data[0].url;
      const finalData = image.data
      

    res.status(200).json({ imageUrl, finalData })
    console.log(image.data);
    console.log('image', image)
}



