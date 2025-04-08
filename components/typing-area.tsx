"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { VirtualKeyboard } from "./virtual-keyboard"

type TypingAreaProps = {
  text: string
  currentPosition: number
  isComposing: boolean
  setIsComposing: (value: boolean) => void
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  t: (key: string) => string
}

export function TypingArea({ text, currentPosition, isComposing, setIsComposing, handleInput, t }: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Calculate the offset to center the current character
  useEffect(() => {
    if (textContainerRef.current && containerRef.current) {
      // Get all character elements
      const charElements = textContainerRef.current.children

      if (currentPosition < charElements.length) {
        // Get the current character element
        const currentChar = charElements[currentPosition] as HTMLElement

        // Calculate the offset to center this character
        const containerWidth = containerRef.current.offsetWidth
        const charOffset = currentChar.offsetLeft + currentChar.offsetWidth / 2
        const centerOffset = containerWidth / 2

        // Set the offset to center the current character
        setOffset(charOffset - centerOffset)
      }
    }
  }, [currentPosition, text])

  // Get the next character to type (for keyboard highlighting)
  const getNextChar = () => {
    if (currentPosition < text.length) {
      return text[currentPosition].toLowerCase()
    }
    return ""
  }

  return (
    <div className="w-full mb-3">
      <div ref={containerRef} className="relative bg-gray-800 p-3 rounded-lg mb-3 h-20 overflow-hidden">
        {/* Text container with relative positioning */}
        <div
          ref={textContainerRef}
          className="whitespace-nowrap text-2xl flex items-center justify-start h-full relative"
          style={{
            transform: `translateX(calc(${-offset}px))`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {text.split("").map((char, index) => (
            <span
              key={index}
              className={
                index === currentPosition
                  ? "whitespace-pre bg-yellow-500 text-black p-0.5 rounded-md"
                  : index < currentPosition
                    ? "whitespace-pre p-0.5 text-green-400"
                    : "whitespace-pre p-0.5 text-gray-400"
              }
            >
              {char}
            </span>
          ))}
        </div>

        {/* Gradient masks for fading text at edges */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none"></div>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-10"
        onChange={handleInput}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onBlur={(e) => {
          setTimeout(() => inputRef.current?.focus(), 10);
        }}
      />

      <VirtualKeyboard nextChar={getNextChar()} t={t} />
    </div>
  )
}
