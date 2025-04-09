"use client"

import { Button } from "@/components/ui/button"
import { useKeyboardInput } from "../hooks/use-keyboard-input"

type GameOverProps = {
  winner: string
  accuracy: number
  currentPosition: number
  textLength: number
  resetGame: () => void
  returnToLevelSelect: () => void
  t: (key: string) => string
  language: string
}

export function GameOver({
  winner,
  accuracy,
  currentPosition,
  textLength,
  resetGame,
  returnToLevelSelect,
  t,
  language,
}: GameOverProps) {
  // 使用自定义Hook处理键盘输入
  const { inputElement, focusInput } = useKeyboardInput({
    onInput: (e) => {
      const value = e.target.value.toLowerCase()
      if (value.includes("r")) {
        resetGame()
      } else if (value.includes("c")) {
        returnToLevelSelect()
      }
    },
  })

  return (
    <div className="mb-3 text-center" onClick={focusInput}>
      <h2 className="text-2xl font-bold mb-2">
        {winner === "Hero" ? (
          <span className="text-green-400">
            {t("hero")} {language === "zh" ? "获胜" : "Wins!"}
          </span>
        ) : (
          <span className="text-red-400">
            {t("boss")} {language === "zh" ? "获胜" : "Wins!"}
          </span>
        )}
      </h2>
      <div className="mb-3">
        <p>
          {t("finalAccuracy")}: {accuracy}%
        </p>
        <p>
          {t("completion")}: {Math.round((currentPosition / textLength) * 100)}%
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <Button onClick={resetGame} className="bg-yellow-600 hover:bg-yellow-700">
          {t("playAgain")} <span className="text-yellow-300">[R]</span>
        </Button>
        <Button
          onClick={returnToLevelSelect}
          variant="outline"
          className="text-gray-300 border-gray-700 bg-gray-600 hover:bg-gray-800"
        >
          {t("changeLevel")} <span className="text-gray-300">[C]</span>
        </Button>
      </div>

      {/* 隐藏的输入框，用于捕获输入 */}
      {inputElement}
    </div>
  )
}
