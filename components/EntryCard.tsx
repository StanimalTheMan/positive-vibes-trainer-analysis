const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  console.log(entry)
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <strong className="px-4 py-5">{date}</strong>
      <div className="px-4 py-5">
        <strong>content:</strong> {entry.content}
      </div>
    </div>
  )
}

export default EntryCard
