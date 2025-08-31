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
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            disabled={!mounted}
            style={{ opacity: mounted ? 1 : 1 }}
        >
            {!mounted ? (
                <div className="w-4 h-4 rounded-full bg-primary/0 animate-pulse" />
            ) : currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 opacity-0 animate-[fadeIn_0.1s_ease-in-out_forwards]" />
            ) : (
                <Moon className="w-4 h-4 opacity-0 animate-[fadeIn_0.1s_ease-in-out_forwards]" />
            )}
        </button>
    )
}