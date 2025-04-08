"use client"

import { useState, useCallback, useEffect } from "react"
import { getAllLevels, type LevelConfig } from "./levels"
import { getTranslation, type LanguageStrings } from "./i18n"
import { LevelSelect } from "./components/level-select"
import { GameHeader } from "./components/game-header"
import { StatsDisplay } from "./components/stats-display"
import { BattleArena } from "./components/battle-arena"
import { TypingArea } from "./components/typing-area"
import { GameOver } from "./components/game-over"
import { BattleLog } from "./components/battle-log"
import { useTypingGame } from "./hooks/use-typing-game"

export default function TypingDungeonBattle() {
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(getAllLevels()[0])
  const [showLevelSelect, setShowLevelSelect] = useState(true)
  const [language, setLanguage] = useState<string>("zh") // Default to Chinese

  // Translation helper
  const t = useCallback(
    (key: keyof LanguageStrings, params?: Record<string, string | number>) => {
      return getTranslation(language, key, params)
    },
    [language],
  )

  // Get game state and logic from custom hook
  const {
    heroHP,
    bossHP,
    battleLog,
    isHeroAttacking,
    isBossAttacking,
    gameOver,
    winner,
    text,
    isComposing,
    setIsComposing,
    currentPosition,
    accuracy,
    handleInput,
    resetGame,
  } = useTypingGame(currentLevel, t)

  // Handle level selection
  const selectLevel = (level: LevelConfig) => {
    setCurrentLevel(level)
    setShowLevelSelect(false)
  }

  // Handle language change
  const changeLanguage = (lang: string) => {
    setLanguage(lang)
  }

  // Return to level select screen
  const returnToLevelSelect = () => {
    setShowLevelSelect(true)
  }

  // Prevent layout issues when keyboard appears on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        document.documentElement.style.height = `${window.visualViewport.height}px`
      }
    }
    window.visualViewport?.addEventListener("resize", handleResize)
    return () => window.visualViewport?.removeEventListener("resize", handleResize)
  }, [])

  // Level selection screen
  if (showLevelSelect) {
    return <LevelSelect language={language} changeLanguage={changeLanguage} selectLevel={selectLevel} t={t} />
  }

  // Game screen
  return (
    <div
      className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-2xl"
      onClick={() => document.querySelector("input")?.focus()}
    >
      <GameHeader
        language={language}
        changeLanguage={changeLanguage}
        returnToLevelSelect={returnToLevelSelect}
        currentLevelName={currentLevel.name}
        t={t}
      />

      <StatsDisplay accuracy={accuracy} currentPosition={currentPosition} textLength={text.length} t={t} />

      <BattleArena
        heroHP={heroHP}
        bossHP={bossHP}
        currentLevel={currentLevel}
        isHeroAttacking={isHeroAttacking}
        isBossAttacking={isBossAttacking}
        t={t}
      />

      {!gameOver ? (
        <TypingArea
          text={text}
          currentPosition={currentPosition}
          isComposing={isComposing}
          setIsComposing={setIsComposing}
          handleInput={handleInput}
          t={t}
        />
      ) : (
        <GameOver
          winner={winner}
          accuracy={accuracy}
          currentPosition={currentPosition}
          textLength={text.length}
          resetGame={resetGame}
          returnToLevelSelect={returnToLevelSelect}
          t={t}
          language={language}
        />
      )}

      <BattleLog battleLog={battleLog} t={t} />
    </div>
  )
}
