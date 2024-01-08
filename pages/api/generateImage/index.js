import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getServerSession(authOptions);

  const { id } = session.user;

  await connectMongo();

  const user = await User.findById(id);
  if (!user || user.currentCredits === 0) {
    return res.status(403).json({ error: "Not enough credits" });
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
      prompt: prompt,
    });
    console.log("OpenAI API response received");

    const imageUrl = image.data[0].url;
    const finalData = image.data;

    user.currentCredits = user.currentCredits - 1;
    await user.save();

    res.status(200).json({ imageUrl, finalData });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res
      .status(500)
      .json({ error: "Error generating image", details: error.message });
  }
}
