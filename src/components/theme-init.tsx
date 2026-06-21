"use client"

import { useServerInsertedHTML } from "next/navigation"

interface ThemeInitProps {
  script: string
}

export function ThemeInit({ script }: ThemeInitProps) {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  ))
  return null
}
