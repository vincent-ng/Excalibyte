"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

type LanguageSelectorProps = {
  language: string
  changeLanguage: (lang: string) => void
}

export function LanguageSelector({ language, changeLanguage }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors">
          <Globe size={20} />
          <span className="ml-1 text-sm">{language.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
        <DropdownMenuItem
          className={`${language === "zh" ? "bg-gray-700" : ""} cursor-pointer hover:bg-gray-700`}
          onClick={() => changeLanguage("zh")}
        >
          中文
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${language === "en" ? "bg-gray-700" : ""} cursor-pointer hover:bg-gray-700`}
          onClick={() => changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
