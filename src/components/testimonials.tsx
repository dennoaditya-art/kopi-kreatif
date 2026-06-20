"use client"

import { motion, useReducedMotion } from "motion/react"
import { testimonials } from "@/lib/coffee-data"
import { Star, Coffee } from "lucide-react"

const AVATAR_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-tertiary",
]

const CARD_BORDERS = [
  "border-primary/15 dark:border-primary/30",
  "border-secondary/15 dark:border-secondary/30",
  "border-accent/15 dark:border-accent/30",
  "border-tertiary/15 dark:border-tertiary/30",
]

export function Testimonials() {
  const reduce = useReducedMotion()

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-gradient-to-b from-white to-surface-alt/60 dark:from-zinc-950 dark:to-zinc-900/30 relative overflow-hidden">
      <motion.div
        className="absolute -bottom-10 left-10 text-primary/20 text-6xl select-none pointer-events-none"
        animate={reduce ? undefined : { y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Coffee size={40} />
      </motion.div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-10 space-y-2">
          <h2 className="tracking-display text-3xl sm:text-4xl font-black">
            Kata Mereka
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Yang suka ngopi, yang baru jatuh cinta sama kopi — semuanya punya cerita.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
              className={`bg-white dark:bg-zinc-900 rounded-2xl border-2 ${CARD_BORDERS[i]} p-5 space-y-3 flex flex-col card-shadow hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={12}
                    fill={si < t.rating ? "currentColor" : "none"}
                    className={si < t.rating ? "text-secondary" : "text-zinc-200 dark:text-zinc-700"}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 text-zinc-700 dark:text-zinc-300">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <motion.div
                  className={`h-8 w-8 rounded-full ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {t.name.charAt(0)}
                </motion.div>
                <div>
                  <p className="text-sm font-bold leading-tight">{t.name}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
