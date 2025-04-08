"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import type { LevelConfig } from "../levels"
import type { LanguageStrings } from "../i18n"

export function useTypingGame(
  currentLevel: LevelConfig,
  t: (key: keyof LanguageStrings, params?: Record<string, string | number>) => string,
) {
  const [heroHP, setHeroHP] = useState(currentLevel.heroHP)
  const [bossHP, setBossHP] = useState(currentLevel.bossHP)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isHeroAttacking, setIsHeroAttacking] = useState(false)
  const [isBossAttacking, setIsBossAttacking] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState("")

  // Typing game state
  const [text, setText] = useState(currentLevel.text)
  const [userInput, setUserInput] = useState("")
  const [isComposing, setIsComposing] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)

  // List of modifier keys to ignore
  const modifierKeys = [
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "Tab",
    "Escape",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Insert",
    "Delete",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "NumLock",
    "ScrollLock",
    "Pause",
    "ContextMenu",
  ]

  // Handle key press
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (gameOver) return

      if (isComposing) return // 忽略输入法组合过程中的事件

      const inputValue = e.target.value
      if (!inputValue) return

      // 获取最新输入的字符（处理多字符粘贴情况）
      const typedChar = inputValue.slice(-1)

      // 立即清空输入框（关键！）
      e.target.value = ""

      const expectedChar = text[currentPosition]

      // Only count non-modifier keys for keystrokes
      // setTotalKeystrokes((prev) => prev + 1)

      // Check if the typed character matches the expected character
      if (typedChar === expectedChar) {
        // Correct typing
        // setCorrectKeystrokes((prev) => prev + 1)
        setUserInput((prev) => prev + typedChar)
        setCurrentPosition((prev) => prev + 1)

        // Hero attacks boss with fixed damage
        const damage = currentLevel.heroDamage
        setIsHeroAttacking(true)

        setTimeout(() => {
          setBossHP((prev) => {
            const newHP = Math.max(0, prev - damage)
            setBattleLog((prev) => [t("heroAttack", { damage, typedChar }), ...prev])
            return newHP
          })
          setIsHeroAttacking(false)
        }, 300)
      } else {
        // Incorrect typing
        // Boss attacks hero
        const damage =
          Math.floor(Math.random() * (currentLevel.bossDamageMax - currentLevel.bossDamageMin + 1)) +
          currentLevel.bossDamageMin
        setIsBossAttacking(true)

        setTimeout(() => {
          setHeroHP((prev) => {
            const newHP = Math.max(0, prev - damage)
            setBattleLog((prev) => [t("bossAttack", { damage, typedChar }), ...prev])
            return newHP
          })
          setIsBossAttacking(false)
        }, 300)
      }

      // Update accuracy - using functional updates to get latest state values
      setTotalKeystrokes((prev) => {
        const newTotal = prev + 1
        setCorrectKeystrokes((prevCorrect) => {
          const newCorrect = typedChar === expectedChar ? prevCorrect + 1 : prevCorrect
          // Calculate accuracy with the latest values and avoid division by zero
          const accuracyValue = newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100
          setAccuracy(accuracyValue)
          return newCorrect
        })
        return newTotal
      })
    },
    [currentPosition, text, gameOver, correctKeystrokes, totalKeystrokes, modifierKeys, currentLevel, t, isComposing],
  )

  // Check for game over
  useEffect(() => {
    if (heroHP <= 0) {
      setGameOver(true)
      setWinner("Boss")
      setBattleLog((prev) => [t("bossWins"), ...prev])
    } else if (bossHP <= 0 || currentPosition >= text.length) {
      setGameOver(true)
      setWinner("Hero")
      setBattleLog((prev) => [t("heroWins"), ...prev])
    }
  }, [heroHP, bossHP, currentPosition, text.length, t])

  const resetGame = () => {
    setHeroHP(currentLevel.heroHP)
    setBossHP(currentLevel.bossHP)
    setBattleLog([])
    setGameOver(false)
    setWinner("")
    setUserInput("")
    setCurrentPosition(0)
    setAccuracy(100)
    setCorrectKeystrokes(0)
    setTotalKeystrokes(0)
  }

  // Update game state when level changes
  useEffect(() => {
    setText(currentLevel.text)
    setHeroHP(currentLevel.heroHP)
    setBossHP(currentLevel.bossHP)
    setBattleLog([])
    setGameOver(false)
    setWinner("")
    setUserInput("")
    setCurrentPosition(0)
    setAccuracy(100)
    setCorrectKeystrokes(0)
    setTotalKeystrokes(0)
  }, [currentLevel])

  return {
    heroHP,
    bossHP,
    battleLog,
    isHeroAttacking,
    isBossAttacking,
    gameOver,
    winner,
    text,
    userInput,
    isComposing,
    setIsComposing,
    currentPosition,
    accuracy,
    handleInput,
    resetGame,
  }
}
