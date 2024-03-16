import connectMongo from '@/libs/mongoose';
import Image from '@/models/Image';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
    await connectMongo();

    const { image } = await req.json();

    try {
        // Send image to OpenAI for labeling
        const labelsResponse = await openai.createCompletion({
            model: 'gpt-4-vision-preview',
            prompt: 'Provide 3 specific labels for this image:',
            // Attach the base64 image to the prompt
            attachments: [{
                data: image.split(',')[1], // Assuming the format "data:image/png;base64,iVBORw0KGgo..."
                type: 'image/jpeg',
            }],
            max_tokens: 50,
        });

        // Process OpenAI's response to get the labels
        const labels = labelsResponse.choices[0].text.trim().split(',').map(label => label.trim());

        // Create a new image with the received labels
        const newImage = new Image({
            data: image,
            labels: labels,
        });
        await newImage.save();

        return new Response(JSON.stringify(newImage), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error processing image:', error);
        return new Response(JSON.stringify({ error: 'Error processing image' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function GET(req) {
    await connectMongo();

    try {
        const images = await Image.find({});
        return new Response(JSON.stringify(images), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
