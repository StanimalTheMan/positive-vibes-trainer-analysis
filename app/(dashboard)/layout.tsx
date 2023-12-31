'use client'

import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

const DashboardLayout = ({ children }) => {
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <div className="h-screen w-screen bg-black relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r text-white border-white/70">
        <div>Positive Vibes Trainer Analysis</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b text-white border-white/70">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <button onClick={() => signOut(() => router.push('/journal'))}>
              Sign out
            </button>
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
