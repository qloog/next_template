import OpenAI from "openai";

const openai = new OpenAI();





export default async function handler(req, res) {
    async function main() {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "Create a new Custom Tattoo Design with the followung attributes: -Short description less than 80 characters -Type of tattoo" }],
          model: "gpt-3.5-turbo",
        });
      
        console.log('completion', completion.data.choices)
        console.log(completion.choices[0]);
      }
      main();

    res.status(200).json({ name: 'John Doe' })
}
