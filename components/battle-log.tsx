type BattleLogProps = {
  battleLog: string[]
  t: (key: string) => string
}

export function BattleLog({ battleLog, t }: BattleLogProps) {
  return (
    <div className="w-full">
      <h3 className="font-bold mb-1 border-b border-gray-700 pb-1 text-sm">{t("battleLog")}:</h3>
      <div className="bg-gray-800 p-2 rounded-lg h-24 overflow-y-auto text-sm">
        {battleLog.length === 0 ? (
          <p className="text-gray-500 italic">{t("battleNotStarted")}</p>
        ) : (
          battleLog.map((log, index) => (
            <p key={index} className="mb-1">
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  )
}
