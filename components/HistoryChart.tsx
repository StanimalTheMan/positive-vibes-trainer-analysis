'use client'
import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from 'recharts'

const CustomToolTip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-white">{dateLabel}</p>
        <p className="intro text-xl uppercase text-white">
          {analysis.mood}: {analysis.positiveSentimentScore * 100}%
        </p>
      </div>
    )
  }
  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={300} height={300} data={data}>
        <Line
          dataKey="positiveSentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
