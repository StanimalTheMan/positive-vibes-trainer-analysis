import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: 'foobar' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'jiggyluv__sdk2k23yktv69',
        fullName: 'Stanimal Is',
      },
    }),
  }
})

test('Home', async () => {
  render(await HomePage())
  expect(
    screen.getByText(
      'This is the best app for tracking your positivity in your day to day life. All you have to do is be honest and try to see the positives.'
    )
  ).toBeTruthy()
})
