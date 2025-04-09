"use client"

import type React from "react"

import { useEffect, useRef } from "react"

type KeyboardInputOptions = {
  onKeyDown?: (key: string) => void
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  preventBlur?: boolean
}

export function useKeyboardInput({ onInput, autoFocus = true, preventBlur = true }: KeyboardInputOptions) {
  const inputRef = useRef<HTMLInputElement>(null)

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // 处理输入事件
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e)
    }

    // 清空输入框，以便下次输入
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  // 处理失焦事件
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (preventBlur && inputRef.current) {
      // 防止输入框失去焦点
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }

  // 聚焦输入框的函数
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // 创建隐藏输入框的JSX
  const inputElement = (
    <input
      ref={inputRef}
      type="text"
      className="opacity-0 absolute -z-10 h-0"
      onChange={handleInput}
      onBlur={handleBlur}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
    />
  )

  return {
    inputRef,
    inputElement,
    focusInput,
  }
}
