"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn("flex flex-col items-center justify-center px-4 py-20 text-center", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border-2 border-ink bg-gradient-to-br from-card to-paper-alt card-shadow-hard dark:from-surface-ink dark:to-surface-alt-ink"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-ink/40 dark:text-white/40">{icon}</div>
      </motion.div>
      <h3 className="mt-6 text-xl font-black text-ink dark:text-white">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted dark:text-ink-muted/80">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
