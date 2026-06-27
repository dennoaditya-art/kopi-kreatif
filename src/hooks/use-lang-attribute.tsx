"use client"

import { useEffect } from "react"
import { useLocale } from "@/lib/i18n/context"

export function LangAttributeUpdater() {
  const locale = useLocale()
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "id"
  }, [locale])
  return null
}