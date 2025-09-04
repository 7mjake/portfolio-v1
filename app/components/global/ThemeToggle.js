'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'feather-icons-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="bg-primary/10 hover:bg-primary/20 cursor-pointer rounded-lg p-2 transition-colors"
      aria-label="Toggle theme"
      disabled={!mounted}
      style={{ opacity: mounted ? 1 : 1 }}
    >
      {!mounted ? (
        <div className="bg-primary/0 h-4 w-4 animate-pulse rounded-full" />
      ) : currentTheme === 'dark' ? (
        <Sun className="h-4 w-4 animate-[fadeIn_0.1s_ease-in-out_forwards] opacity-0" />
      ) : (
        <Moon className="h-4 w-4 animate-[fadeIn_0.1s_ease-in-out_forwards] opacity-0" />
      )}
    </button>
  )
}
