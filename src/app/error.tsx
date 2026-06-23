"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Frown, RefreshCw } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  const { t } = useI18n()

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] border-2 border-ink bg-card card-shadow-hard">
          <Frown size={28} className="text-ink" />
        </div>
        <h1 className="text-2xl font-black text-ink dark:text-white">{t("umum.terjadi_kesalahan")}</h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          {t("umum.kesalahan_desc")}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} className="gap-2 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover">
            <RefreshCw size={16} />
            {t("umum.muat_ulang")}
          </Button>
        </div>
        <p className="text-xs text-ink-muted/60 font-mono">
          {error.digest ? `Error ID: ${error.digest}` : ""}
        </p>
      </div>
    </div>
  )
}
