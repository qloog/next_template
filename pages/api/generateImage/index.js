
import OpenAI from "openai";



const openai = new OpenAI();

export default async function handler(req, res) {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: "A sikh warrior" });
    res.status(200).json({ image })
    console.log(image.data);
    console.log('image', image)
}



