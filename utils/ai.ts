import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import {
  ComprehendClient,
  BatchDetectSentimentCommand,
  DetectSentimentCommand,
} from '@aws-sdk/client-comprehend' // ES Modules import
import z from 'zod'
// require('dotenv').config()

const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}

const client = new ComprehendClient(config)

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the entry.  Example #0101fe for blue representing happiness.'
      ),
  })
)

export const analyze = async (content) => {
  //   const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  //   const result = await model.call(prompt)

  //   console.log(result)

  // AWS Comprehend
  const input = {
    Text: content,
    LanguageCode: 'en',
  }
  const command = new DetectSentimentCommand(input)
  const response = await client.send(command)
  return response
}
