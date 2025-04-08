"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { levelCategories, type LevelConfig } from "../levels"
import { LanguageSelector } from "./language-selector"

type LevelSelectProps = {
  language: string
  changeLanguage: (lang: string) => void
  selectLevel: (level: LevelConfig) => void
  t: (key: string) => string
}

export function LevelSelect({ language, changeLanguage, selectLevel, t }: LevelSelectProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-2xl">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          {t("gameTitle")} - {t("levelSelect")}
        </h1>
        <LanguageSelector language={language} changeLanguage={changeLanguage} />
      </div>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          {levelCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-base">
              {language === "zh" ? category.name.zh : category.name.en}
            </TabsTrigger>
          ))}
        </TabsList>

        {levelCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {category.levels.map((level) => (
                <Card key={level.id} className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-yellow-400 flex items-center">
                        {level.name}
                        <span className="ml-2 text-sm font-normal text-gray-400">{level.description}</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">
                      {language === "zh" ? category.description.zh : category.description.en}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{t("heroHP")}:</span>
                        <span className="text-green-400">{level.heroHP}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("bossHP")}:</span>
                        <span className="text-red-400">{level.bossHP}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("heroDamage")}:</span>
                        <span className="text-blue-400">{level.heroDamage}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <div className="line-clamp-2 italic">"{level.text.substring(0, 50)}..."</div>
                        <div className="mt-1">
                          {t("textLength")}: {level.text.length} {t("characters")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                      onClick={() => selectLevel(level)}
                    >
                      {t("select")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
