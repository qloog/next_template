import OpenAI from "openai";

import { OpenAIStream, StreamingTextResponse} from 'ai'


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY2,
});

export async function POST(req) {
    
const { content } = await req.json()


const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4-vision-preview",
    stream: true,
});

const stream = OpenAIStream(chatCompletion)


return new StreamingTextResponse(stream)
}