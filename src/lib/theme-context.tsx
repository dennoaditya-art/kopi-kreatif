"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "kopi-theme"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "dark" || stored === "light") {
      applyTheme(stored)
      return stored
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark")
      return "dark"
    }
  } catch {}
  applyTheme("light")
  return "light"
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
  }, [])

  const toggle = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
