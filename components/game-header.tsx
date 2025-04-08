"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LanguageSelector } from "./language-selector"

type GameHeaderProps = {
  language: string
  changeLanguage: (lang: string) => void
  returnToLevelSelect: () => void
  currentLevelName: string
  t: (key: string) => string
}

export function GameHeader({ language, changeLanguage, returnToLevelSelect, currentLevelName, t }: GameHeaderProps) {
  return (
    <div className="flex items-center mb-4 w-full justify-between">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-yellow-400">{t("typingBattle")}</h1>
        <span className="ml-2 px-2 py-1 bg-gray-800 rounded text-sm">{currentLevelName}</span>

        {/* Using Popover for help tooltip */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="ml-2 text-gray-400 hover:text-yellow-400 transition-colors">
              <HelpCircle size={20} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="max-w-xs bg-gray-800 border-gray-700 text-white p-3">
            <p className="font-bold mb-1">{t("howToPlay")}:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>{t("tipType")}</li>
              <li>{t("tipCorrect")}</li>
              <li>{t("tipIncorrect")}</li>
              <li>{t("tipComplete")}</li>
              <li>{t("tipClick")}</li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSelector language={language} changeLanguage={changeLanguage} />
        <Button
          variant="outline"
          size="sm"
          onClick={returnToLevelSelect}
          className="text-gray-300 border-gray-700 bg-gray-600 hover:bg-gray-800"
        >
          {t("changeLevel")}
        </Button>
      </div>
    </div>
  )
}
