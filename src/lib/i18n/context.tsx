"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { id } from "./id"
import { en } from "./en"

export type Locale = "id" | "en"

type Dict = Record<string, string | Record<string, string | Record<string, string>>>

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dict: Dict
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getNestedValue(obj: Dict | string | undefined, path: string[]): string | undefined {
  let current: Dict | string | undefined = obj
  for (const key of path) {
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Dict)[key]
    } else {
      return undefined
    }
  }
  return typeof current === "string" ? current : undefined
}

const LOCALE_STORAGE_KEY = "kopi-locale"

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "id"
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored === "en" || stored === "id") return stored
  } catch {}
  return "id"
}

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale?: Locale
  children: ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? getInitialLocale())

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(LOCALE_STORAGE_KEY, l) } catch {}
  }, [])

  const t = useCallback(
    (key: string): string => {
      const dict = locale === "en" ? en : id
      const path = key.split(".")
      const val = getNestedValue(dict, path)
      if (val) return val
      const fallback = getNestedValue(id, path)
      return fallback ?? key
    },
    [locale],
  )

  const dict = locale === "en" ? en : id

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dict }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export function useTranslate(): I18nContextValue["t"] {
  return useI18n().t
}

export function useLocale(): I18nContextValue["locale"] {
  return useI18n().locale
}

export function useSetLocale(): I18nContextValue["setLocale"] {
  return useI18n().setLocale
}

export function useDict() {
  return useI18n().dict
}

export { id as dictId }
export { en as dictEn }
