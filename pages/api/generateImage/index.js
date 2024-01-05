import { json } from "express";
import OpenAI from "openai";
import { getSession } from "next-auth/react";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User"


const openai = new OpenAI
   


export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }


    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ error: 'You must be signed in to use this feature.' });
    }

    await connectMongo();
    const user = await User.findOne({ email: session.user.email });

    if (!user || !user.hasAccess) {
        return res.status(403).json({ error: "You need to have an active subscription to use this feature." });
    }



    const { prompt } = req.body;
    console.log(req.body);


    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    try {
        console.log("Calling OpenAI API");
        const image = await openai.images.generate({
            model: "dall-e-3", 
            prompt: prompt});
            console.log("OpenAI API response received");
       
         const imageUrl = image.data[0].url;
         const finalData = image.data
         
   
       res.status(200).json({ imageUrl, finalData })
    }
    catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: 'Error generating image', details: error.message });
    }
    

  
}