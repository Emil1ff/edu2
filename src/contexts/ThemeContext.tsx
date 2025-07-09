"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Theme, ColorScheme } from "../store/types"

interface ThemeContextType {
  theme: Theme
  colorScheme: ColorScheme
  toggleTheme: () => void
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("blue")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme

    if (savedTheme) setTheme(savedTheme)
    if (savedColorScheme) setColorSchemeState(savedColorScheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    localStorage.setItem("colorScheme", scheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme }}>
      <div className={`${theme} theme-${colorScheme}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
