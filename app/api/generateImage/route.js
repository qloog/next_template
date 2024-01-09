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
    console.log(imageUrl)

    user.currentCredits = user.currentCredits - 1
    await user.save()

    return NextResponse.json({ imageUrl: finalData })
  } catch (error) {
    console.error('OpenAI API Error:', error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}