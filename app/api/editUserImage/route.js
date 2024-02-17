import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY2
})

const openai = new OpenAIApi(configuration);

export async function POST(request) {
const { image } = await request.json()

const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "What's in this image?" }, 
                { type: "image_url", image_url: image }//base64 images
            ]
        }
    ]
});
messages.append(response.json()["choices"][0]["message"])
messages.append [
    {
        role: "user",
        content: [
            { type: "text", text: "Take in the response from gpt 4 and generate the exact same based off the response but with the requested changes from the user of whatever they want changed or removed from the image. Make sure to keep everything else in the image the exact same and just remove or change what the user described. The image should be as accurate as possible to the one they attached and based off their changes." }, 
        ]
    }
]

const editedDesign = await openai.images.generate({
    model: 'dall-e-3',
    prompt: response.json()["choices"][0]["message"],
   

  })

const stream = OpenAIStream(response);

return new StreamingTextResponse(stream);

}




