'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [updatedNotification, setUpdatedNotification] = useState('')

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
      }
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full">
      {isLoading && <div>...loading</div>}
      {updatedNotification != '' && <header>{updatedNotification}</header>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
