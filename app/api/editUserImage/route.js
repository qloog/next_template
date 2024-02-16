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




/* import { OpenAIStream, StreamingTextResponse } from "ai"
import { model } from "mongoose";
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

export async function POST(req) {
const { image } = await req.json()

const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "Modify the image to a better styling" }, 
                { type: "image_url", image_url: image }//base64 images
            ]
        }
    ]
});
const stream = OpenAIStream(response);

return new StreamingTextResponse(stream);


}
*/