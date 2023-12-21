
import { json } from "express";
import OpenAI from "openai";



const openai = new OpenAI();

export default async function handler(req, res) {
    const image = await openai.images.generate({ model: "dall-e-3", prompt: "A sikh warrior but in JSON format" });
    const jsonString = `{
        "created": 1703186049,
        "data": [
          {
            "revised_prompt": "A Sikh warrior in detailed traditional attire: He is of South Asian descent with a dark complexion. His turban is a dominant orange, elaborated with golden motifs. His eyes are fierce and determined, exuding courage. He is brandishing a shining silver 'Kirpan' - a symbolic sword. His beard is thick and black, carefully maintained. His clothes are colorful, accentuating his bold personality. The background is a vast battlefield depicting an ancient time, war horses and other warriors can be seen in the distance.",
            "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-yE0yZi7HQ5tvjqN8KmFT8zjj/user-JsER1Ila43JqOWvhrz5b1G0d/img-kO64JOqQBval6vZxLC9wdr68.png?st=2023-12-21T18%3A14%3A09Z&se=2023-12-21T20%3A14%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-20T23%3A05%3A18Z&ske=2023-12-21T23%3A05%3A18Z&sks=b&skv=2021-08-06&sig=kM28gYa%2BdwzBsjWDg4lMi2q2FZDfI7gQ1oOY6TKMhlc%3D"
          }
        ]
      }`;
      const parsedData = JSON.parse(jsonString);
      console.log(parsedData);
 
      


    res.status(200).json({ parsedData })
    console.log(image.data);
    console.log('image', image)
}



