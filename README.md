# Positive-Vibes-Trainer-Analysis

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##

This [app](https://positive-vibes-trainer-analysis.vercel.app/) lets you use Clerk to sign up and log in. Once authenticated, you can train yourself to be less negative by adding a new journal entry and modifying it to summarize the positives of your day. Using AWS Comprehend to detect sentiment, OpenAI and Langchain to use some AI to analyze entry content, and recharts to make a line graph of positive sentiment scores, this app will not let you post a journal entry with less than a 50% positive sentiment score. I also got to learn more about server vs. client components, file based system routing in Next.js.
