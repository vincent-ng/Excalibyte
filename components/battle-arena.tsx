"use client"

import { Zap, Flame } from "lucide-react"
import type { LevelConfig } from "../levels"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ExplosionEffect } from "./explosion-effect"

type BattleArenaProps = {
  heroHP: number
  bossHP: number
  currentLevel: LevelConfig
  isHeroAttacking: boolean
  isBossAttacking: boolean
  t: (key: string) => string
}

export function BattleArena({ heroHP, bossHP, currentLevel, isHeroAttacking, isBossAttacking, t }: BattleArenaProps) {
  const [heroProjectile, setHeroProjectile] = useState(false)
  const [bossProjectile, setBossProjectile] = useState(false)
  const [showHeroExplosion, setShowHeroExplosion] = useState(false)
  const [showBossExplosion, setShowBossExplosion] = useState(false)

  // Trigger projectile animations when attack states change
  useEffect(() => {
    if (isHeroAttacking) {
      setHeroProjectile(true)
    }
  }, [isHeroAttacking])

  useEffect(() => {
    if (isBossAttacking) {
      setBossProjectile(true)
    }
  }, [isBossAttacking])

  // 处理投射物动画结束
  const handleHeroProjectileEnd = () => {
    setHeroProjectile(false)
    setShowBossExplosion(true) // 在投射物动画结束时触发爆炸效果
  }

  const handleBossProjectileEnd = () => {
    setBossProjectile(false)
    setShowHeroExplosion(true) // 在投射物动画结束时触发爆炸效果
  }

  // 处理爆炸效果结束
  const handleHeroExplosionComplete = () => {
    setShowHeroExplosion(false)
  }

  const handleBossExplosionComplete = () => {
    setShowBossExplosion(false)
  }

  return (
    <div className="w-full flex flex-col justify-between mb-3">
      {/* HP Bars */}
      <div className="w-full flex justify-between mb-3">
        <div className="w-[45%]">
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-bold">{t("hero")}</span>
            <span>
              {heroHP}/{currentLevel.heroHP}
            </span>
          </div>
          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${(heroHP / currentLevel.heroHP) * 100}%` }}
            />
          </div>
        </div>

        <div className="w-[45%]">
          <div className="flex justify-between mb-1 text-sm">
            <span>
              {bossHP}/{currentLevel.bossHP}
            </span>
            <span className="font-bold">{t("boss")}</span>
          </div>
          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full transition-all duration-500 float-right"
              style={{ width: `${(bossHP / currentLevel.bossHP) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Battle Arena - Reduced height */}
      <div className="w-full flex justify-between items-center h-48 relative bg-gray-800 rounded-lg p-2">
        {/* Hero - Using pixel art image */}
        <div
          className={`transition-transform duration-500 ${isHeroAttacking ? "translate-x-5" : ""} flex flex-col items-center relative`}
        >
          <div className="relative size-36 mx-[3vw]">
            <Image src="/images/hero.png" alt={t("hero")} fill className="object-contain round-md" priority />
            {/* 勇者受到攻击的爆炸效果 */}
            {showHeroExplosion && (
              <ExplosionEffect position="hero" color="#22d3ee" onComplete={handleHeroExplosionComplete} />
            )}
          </div>
          <div className="text-center mt-1 font-bold text-sm">{t("hero")}</div>
        </div>

        {/* Attack Effects */}
        {/* Hero's projectile */}
        {heroProjectile && (
          <div
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2 transition-all duration-500 animate-hero-attack"
            style={{
              animation: "hero-attack 0.5s forwards",
            }}
            onAnimationEnd={handleHeroProjectileEnd}
          >
            <Zap size={32} className="text-yellow-400" />
          </div>
        )}

        {/* Boss's projectile */}
        {bossProjectile && (
          <div
            className="absolute right-1/4 top-1/2 transform -translate-y-1/2 transition-all duration-500 animate-boss-attack"
            style={{
              animation: "boss-attack 0.5s forwards",
            }}
            onAnimationEnd={handleBossProjectileEnd}
          >
            <Flame size={32} className="text-cyan-400" />
          </div>
        )}

        {/* Boss - Using pixel art image */}
        <div
          className={`transition-transform duration-500 ${isBossAttacking ? "-translate-x-5" : ""} flex flex-col items-center relative`}
        >
          <div className="relative size-36 mx-[3vw]">
            <Image src="/images/boss.png" alt={t("boss")} fill className="object-contain rounded" priority />
            {/* 魔王受到攻击的爆炸效果 */}
            {showBossExplosion && (
              <ExplosionEffect position="boss" color="#fbbf24" onComplete={handleBossExplosionComplete} />
            )}
          </div>
          <div className="text-center mt-1 font-bold text-sm">{t("boss")}</div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes hero-attack {
          0% {
            left: 25%;
            opacity: 1;
          }
          100% {
            left:85%;
            opacity: 0.1;
          }
        }
        
        @keyframes boss-attack {
          0% {
            right: 25%;
            opacity: 1;
          }
          100% {
            right: 85%;
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  )
}
