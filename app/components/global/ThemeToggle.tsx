'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'feather-icons-react'

const subscribe = () => () => undefined

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const { theme, setTheme, systemTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="bg-primary/10 hover:bg-primary/20 focus-visible:ring-primary cursor-pointer rounded-lg p-4 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-2"
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      {!mounted ? (
        <div className="bg-primary/0 h-10 w-10 animate-pulse rounded-full motion-reduce:animate-none md:h-4 md:w-4" />
      ) : currentTheme === 'dark' ? (
        <Sun className="h-10 w-10 animate-[fadeIn_0.1s_ease-in-out_forwards] opacity-0 md:h-4 md:w-4" />
      ) : (
        <Moon className="h-10 w-10 animate-[fadeIn_0.1s_ease-in-out_forwards] opacity-0 md:h-4 md:w-4" />
      )}
    </button>
  )
}
