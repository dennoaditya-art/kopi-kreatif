"use client"

import { motion, useReducedMotion } from "motion/react"
import { useI18n } from "@/lib/i18n/context"

export function StatsBanner() {
  const reduce = useReducedMotion()
  const { t } = useI18n()

  const stats = [
  { val: "15+", label: t("stats_banner.daerah_kopi") },
  { val: "4.9", label: t("stats_banner.rating") },
  { val: "200+", label: t("stats_banner.varian") },
]

  return (
    <section className="py-12 bg-paper border-b-2 border-ink/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="text-3xl font-black text-brick">{s.val}</span>
              <span className="text-sm text-ink-muted font-medium">{s.label}</span>
              {i < stats.length - 1 && <div className="hidden sm:block w-px h-8 bg-ink/10 ml-2" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
