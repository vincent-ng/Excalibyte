type VirtualKeyboardProps = {
  nextChar: string
  t: (key: string) => string
}

export function VirtualKeyboard({ nextChar, t }: VirtualKeyboardProps) {
  // Keyboard layout matching a real QWERTY keyboard
  const rows = [
    [
      { key: "`", shift: "~" },
      { key: "1", shift: "!" },
      { key: "2", shift: "@" },
      { key: "3", shift: "#" },
      { key: "4", shift: "$" },
      { key: "5", shift: "%" },
      { key: "6", shift: "^" },
      { key: "7", shift: "&" },
      { key: "8", shift: "*" },
      { key: "9", shift: "(" },
      { key: "0", shift: ")" },
      { key: "-", shift: "_" },
      { key: "=", shift: "+" },
    ],
    [
      { key: "q" },
      { key: "w" },
      { key: "e" },
      { key: "r" },
      { key: "t" },
      { key: "y" },
      { key: "u" },
      { key: "i" },
      { key: "o" },
      { key: "p" },
      { key: "[", shift: "{" },
      { key: "]", shift: "}" },
      { key: "\\", shift: "|" },
    ],
    [
      { key: "a" },
      { key: "s" },
      { key: "d" },
      { key: "f" },
      { key: "g" },
      { key: "h" },
      { key: "j" },
      { key: "k" },
      { key: "l" },
      { key: ";", shift: ":" },
      { key: "'", shift: '"' },
    ],
    [
      { key: "z" },
      { key: "x" },
      { key: "c" },
      { key: "v" },
      { key: "b" },
      { key: "n" },
      { key: "m" },
      { key: ",", shift: "<" },
      { key: ".", shift: ">" },
      { key: "/", shift: "?" },
    ],
  ]

  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      {/* Standard keyboard */}
      <div className="flex flex-col items-center gap-1">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`flex gap-1 justify-center ${rowIndex === 2 ? "ml-3" : rowIndex === 3 ? "ml-6" : ""}`}
          >
            {row.map((keyObj, keyIndex) => (
              <button
                key={`key-${rowIndex}-${keyIndex}`}
                className={`w-8 h-8 rounded text-xs flex flex-col items-center justify-center
                  ${keyObj.key === nextChar || keyObj.shift === nextChar ? "bg-yellow-500 text-black font-bold" : "bg-gray-700"}`}
              >
                {keyObj.shift && <span className="text-[8px] -mb-1">{keyObj.shift}</span>}
                <span className={keyObj.shift ? "text-[10px]" : ""}>{keyObj.key}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="mt-1">
          <button
            className={`w-48 h-6 rounded text-sm ${nextChar === " " ? "bg-yellow-500 text-black font-bold" : "bg-gray-700"}`}
          >
            {t("space")}
          </button>
        </div>
      </div>
    </div>
  )
}
