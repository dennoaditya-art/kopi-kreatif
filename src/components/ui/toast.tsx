"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Check, X, AlertCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: "bg-olive text-white",
  error: "bg-red-600 text-white",
  info: "bg-ink text-paper dark:bg-white dark:text-surface-ink",
}

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const toast = useCallback((message: string, type: ToastType = "info") => {
    toastCounter++
    const id = `toast-${toastCounter}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-24 right-4 sm:right-6 z-[100] flex flex-col gap-2 max-w-sm w-full" aria-live="polite">
          <AnimatePresence>
            {toasts.map((t) => {
              const Icon = icons[t.type]
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 border-ink px-4 py-3 card-shadow-hard",
                    colors[t.type],
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <p className="text-sm font-bold flex-1">{t.message}</p>
                  <button
                    onClick={() => remove(t.id)}
                    className="shrink-0 p-1 rounded-lg hover:opacity-70 transition-opacity"
                    aria-label="Tutup"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
