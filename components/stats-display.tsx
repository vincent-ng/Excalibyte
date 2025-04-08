type StatsDisplayProps = {
  accuracy: number
  currentPosition: number
  textLength: number
  t: (key: string) => string
}

export function StatsDisplay({ accuracy, currentPosition, textLength, t }: StatsDisplayProps) {
  return (
    <div className="w-full flex justify-between mb-3">
      <div className="bg-gray-800 p-2 rounded">
        <span className="font-bold">{t("accuracy")}: </span>
        <span className={accuracy > 80 ? "text-green-400" : accuracy > 60 ? "text-yellow-400" : "text-red-400"}>
          {accuracy}%
        </span>
      </div>
      <div className="bg-gray-800 p-2 rounded">
        <span className="font-bold">{t("progress")}: </span>
        <span>{Math.round((currentPosition / textLength) * 100)}%</span>
      </div>
    </div>
  )
}
