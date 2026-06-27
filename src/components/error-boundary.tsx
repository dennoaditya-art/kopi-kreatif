"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"
import { Button } from "@/components/ui/button"
import { Frown, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  errorId?: string
}

const errorId = () => `ERR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true, errorId: errorId() }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brick/10 text-brick border-2 border-ink card-shadow-hard">
            <Frown size={28} />
          </div>
          <h2 className="text-xl font-black tracking-tight">Terjadi Kesalahan</h2>
          <p className="text-sm text-ink-muted max-w-sm mx-auto leading-relaxed">
            Maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah mendapat notifikasi. Coba muat ulang halaman, atau kembali ke beranda.
          </p>
          {this.state.errorId && (
            <p className="text-[10px] font-mono text-ink-muted/60 select-all">
              ID: {this.state.errorId}
            </p>
          )}
          <div className="flex gap-3 mt-2">
            <Button onClick={this.handleRetry} className="gap-2">
              <RefreshCw size={16} />
              Muat Ulang
            </Button>
            <Link href="/">
              <Button variant="outline" className="gap-2 border-2 border-ink">
                <Home size={16} />
                Beranda
              </Button>
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
