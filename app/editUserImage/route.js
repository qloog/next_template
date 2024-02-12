
import { response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});

export async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }



  try {
    const { content } = await req.json();
    const response = await openai.createCompletion({
     messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-4-vision-preview",
      prompt: content,
    });
    console.log('response', response.data.choices)

    // Log the response or process it as needed
    console.log(response);

    // Respond with the edited image URL or the direct API response
    // Adjust according to what the API returns
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
