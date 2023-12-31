import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Train to journal only positive vibes.</h1>
        <p className="2-xl text-white/60 mb-4">
          This is the best app for tracking your positivity in your day to day
          life. All you have to do is be honest and try to see the positives.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-white text-black/60 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
