import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from '@/libs/mongoose'
import User from '@/models/User'
// Assuming the file is named GalleryImage.js and is located in the models directory
import GalleryImage from '@/models/GalleryImage';


export async function POST(req) {
  const openai = new OpenAI()

  const session = await getServerSession(authOptions)

  const { id } = session.user

  await connectMongo()


  const user = await User.findById(id)

  if (!user || !user.currentCredits || user.currentCredits === 0) {
    return NextResponse.json({ error: 'Not enough credits' }, { status: 403 })
  }

  const body = await req.json()

  if (!body.prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  const prompt = body.prompt

  try {
    console.log('Calling OpenAI API')
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
    })
    console.log('OpenAI API response received')

    const imageUrl = image.data[0].url
    const finalData = image.data
    

    user.currentCredits = user.currentCredits - 1
    await user.save()

    if (body.includeInGallery) {
      // Assuming `imageUrl` contains the URL received from OpenAI
      const imageUrl = finalData; // Or however you extract the URL from the response
    
      // Create a simple `alt` text based on the user's prompt, or use a generic description
      const altText = `Tattoo design inspired by user's prompt: ${prompt}`; // or a generic description
    
      // Create a new gallery item object to save to your database
      const galleryItem = {
        userId: user._id, // Assuming you have the user's ID from the session or another source
        url: imageUrl,
        alt: altText,
      };
    
      // Save this object to your database
      try {
        // Assuming you have a function or method to save to your gallery collection
        await saveGalleryItem(galleryItem);
      } catch (error) {
        console.error('Failed to save image to gallery:', error);
        // Optionally return an error response
      }
    }
    


    return NextResponse.json({ imageUrl , finalData })
  } catch (error) {
    console.error('OpenAI API Error:', error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}