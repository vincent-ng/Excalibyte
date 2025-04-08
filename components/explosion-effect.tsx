"use client"

import { useEffect, useState } from "react"

type ExplosionEffectProps = {
  position: "hero" | "boss"
  color: string
  onComplete: () => void
}

export function ExplosionEffect({ position, color, onComplete }: ExplosionEffectProps) {
  // 创建随机粒子
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // 随机大小
      angle: (Math.PI * 2 * i) / 20 + Math.random() * 0.3, // 均匀分布的角度 + 一点随机性
      distance: Math.random() * 60 + 30, // 随机距离
      duration: Math.random() * 0.3 + 0.3, // 随机持续时间
    })),
  )

  return (
    <div
      className={`absolute top-1/2 ${
        position === "hero" ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"
      } transform -translate-y-1/2 z-10`}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          onAnimationEnd={onComplete} 
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: `particle-${position}-${particle.id} ${particle.duration}s ease-out forwards`,
          }}
        />
      ))}
      <style jsx>{`
        ${particles.map(
          (particle) => `
          @keyframes particle-${position}-${particle.id} {
            0% {
              transform: translate(-50%, -50%);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${Math.cos(particle.angle) * particle.distance}px),
                calc(-50% + ${Math.sin(particle.angle) * particle.distance}px)
              );
              opacity: 0;
            }
          }
        `,
        ).join('\n')}
      `}</style>
    </div>
  )
}
