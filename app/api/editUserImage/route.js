import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?"},
          {
            type: "image_url",
            image_url:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
  const textPrompt = response.choices[0].message.content

  async function createDallEImage() {
    const image = await openai.images.generate({
     model: "dall-e-3", 
     prompt: textPrompt,
     n: 1,
    });
    
  
    console.log(image.data);
    
  }
  createDallEImage()
}

main();






/*

import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?"},
          {
            type: "image_url",
            image_url:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
  const textPrompt = response.choices[0].message.content

  async function createDallEImage() {
    const image = await openai.images.generate({
     model: "dall-e-3", 
     prompt: textPrompt,
     n: 1,
    });
    
  
    console.log(image.data);
    
  }
  createDallEImage()
}

main();

*/



