import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from '@/libs/mongoose'
import User from '@/models/User'

export async function POST(req) {
  const openai = new OpenAI()

  const session = await getServerSession(authOptions)

  const { id } = session.user

  await connectMongo()

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let ipUser = await User.findOne({ ipAddress: ip });

  if (!ipUser) {
    // This is a new user based on IP address
    // Create a new user entry with 2 credits and the captured IP address
    ipUser = new User({ currentCredits: 2, ipAddress: ip });
    await ipUser.save();
  }

  if (session) {
    // Existing user logic with session
    // Use 'user' as it was being used before
    // ...
  } else if (ipUser.currentCredits === 0) {
    // IP-based user exists but no credits left
    return NextResponse.json({ error: 'Not enough credits', promptSignIn: true }, { status: 403 });
  }

  ipUser.currentCredits = ipUser.currentCredits - 1;
  await ipUser.save();


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

    return NextResponse.json({ imageUrl , finalData })
  } catch (error) {
    console.error('OpenAI API Error:', error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}