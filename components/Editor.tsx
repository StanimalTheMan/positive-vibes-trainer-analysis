'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [updatedNotification, setUpdatedNotification] = useState('')

  const {
    mood,
    positiveSentimentScore,
    negativeSentimentScore,
    neutralSentimentScore,
    mixedSentimentScore,
  } = analysis

  const analysisData = [
    { name: 'Mood', value: mood },
    {
      name: 'Positive Sentiment Score',
      value: `${positiveSentimentScore * 100}%`,
    },
    {
      name: 'Negative Sentiment Score',
      value: `${negativeSentimentScore * 100}%`,
    },
    {
      name: 'Neutral Sentiment Score',
      value: `${neutralSentimentScore * 100}%`,
    },
    { name: 'Mixed Sentiment Score', value: `${mixedSentimentScore * 100}%` },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)

      if (updated && updated.isNegative) {
        setUpdatedNotification(
          `Please update journal entry as it is too negative.  The positive sentiment is less than 50%: ${
            updated.positiveSentimentScore * 100
          }%.  It has a negative sentiment of ${
            updated.negativeSentimentScore * 100
          }%`
        )
      } else {
        setUpdatedNotification('')
        setAnalysis(updated.analysis)
      }
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2 text-white">
        {isLoading && <div>...loading</div>}
        {updatedNotification != '' && <header>{updatedNotification}</header>}
        <textarea
          className="w-full h-full p-8 text-black text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-white/70">
        <div className="bg-black px-6 py-10">
          <h2 className="text-2xl text-white">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-white/70"
              >
                <span className="text-lg text-white font-semibold">
                  {item.name}
                </span>
                <span className="text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
