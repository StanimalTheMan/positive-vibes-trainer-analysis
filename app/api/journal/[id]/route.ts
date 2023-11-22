import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()

  const user = await getUserByClerkID()

  const updatedEntryContentAnalysis = await analyze(content)

  if (updatedEntryContentAnalysis.Sentiment == 'POSITIVE') {
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
      data: {
        content,
      },
    })

    const updated = await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      create: {
        entryId: updatedEntry.id,
        userId: user.id,
        mood: updatedEntryContentAnalysis.Sentiment,
        positiveSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Positive,
        negativeSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Negative,
        neutralSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Neutral,
        mixedSentimentScore: updatedEntryContentAnalysis.SentimentScore?.Mixed,
      },
      update: {
        mood: updatedEntryContentAnalysis.Sentiment,
        positiveSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Positive,
        negativeSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Negative,
        neutralSentimentScore:
          updatedEntryContentAnalysis.SentimentScore?.Neutral,
        mixedSentimentScore: updatedEntryContentAnalysis.SentimentScore?.Mixed,
      },
    })

    return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
  }

  // did not update entry since user typed negative stuff per AWS Comprehend
  return NextResponse.json({
    data: {
      isNegative: true,
      positiveSentimentScore:
        updatedEntryContentAnalysis.SentimentScore?.Positive,
      negativeSentimentScore:
        updatedEntryContentAnalysis.SentimentScore?.Negative,
    },
  })
}
