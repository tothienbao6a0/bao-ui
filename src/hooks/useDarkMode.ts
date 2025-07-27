import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useDarkMode(defaultTheme: Theme = 'system') {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Get system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Apply theme to document
    const effectiveTheme = theme === 'system' ? systemTheme : theme

    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, systemTheme])

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark'

  return {
    theme,
    setTheme,
    isDark,
    systemTheme,
  }
}
