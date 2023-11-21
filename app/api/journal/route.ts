import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write something positive about your day!',
    },
  })

  const analysis = await analyze(entry.content)
  console.log(analysis)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: analysis.Sentiment,
      positiveSentimentScore: analysis.SentimentScore?.Positive,
      negativeSentimentScore: analysis.SentimentScore?.Negative,
      neutralSentimentScore: analysis.SentimentScore?.Neutral,
      mixedSentimentScore: analysis.SentimentScore?.Mixed,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
