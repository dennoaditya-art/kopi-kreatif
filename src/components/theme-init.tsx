"use client"

import Script from "next/script"

interface ThemeInitProps {
  script: string
}

export function ThemeInit({ script }: ThemeInitProps) {
  return (
    <Script id="theme-init" strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
