'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'feather-icons-react'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label="Toggle theme"
        >
            {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4" />
            ) : (
                <Moon className="w-4 h-4" />
            )}
        </button>
    )
}