"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"
import { Button } from "@/components/ui/button"
import { Frown } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-20 px-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brick/5 dark:bg-surface-ink text-ink-muted">
            <Frown size={22} />
          </div>
          <h2 className="text-lg font-bold">Terjadi Kesalahan</h2>
          <p className="text-sm text-ink-muted max-w-sm">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman.
          </p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Muat Ulang
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
