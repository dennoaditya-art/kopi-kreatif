"use client"

import { motion, useReducedMotion } from "motion/react"
import { testimonials } from "@/lib/coffee-data"
import { Star, Quote } from "lucide-react"

const ROWS = [
  { items: testimonials.slice(0, 4), dir: "left" as const, speed: 25 },
  { items: testimonials.slice(4, 8), dir: "right" as const, speed: 30 },
]

export function TestimonialsMarquee() {
  const reduce = useReducedMotion()

  return (
    <section className="py-16 sm:py-20 bg-paper-alt relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-ink">
            Kata <span className="text-brick">Mereka</span>
          </h2>
          <p className="text-sm text-ink-muted mt-1 max-w-lg mx-auto">
            Yang suka ngopi, yang baru jatuh cinta sama kopi — semuanya punya cerita.
          </p>
        </motion.div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {ROWS.map((row) => (
          <div className="flex overflow-hidden" key={row.dir}>
            <motion.div
              className="flex gap-4 shrink-0"
              animate={reduce ? undefined : {
                x: row.dir === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
              }}
              transition={{
                repeat: Infinity,
                duration: row.speed,
                ease: "linear",
              }}
            >
              {[...row.items, ...row.items].map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="w-[280px] sm:w-[320px] bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard space-y-3 flex flex-col shrink-0"
                >
                  <Quote size={16} className="text-brick/40" />
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={12}
                        fill={si < t.rating ? "currentColor" : "none"}
                        className={si < t.rating ? "text-brick" : "text-ink/20"}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 text-ink/80">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 pt-2 border-t border-ink/10">
                    <div className="h-8 w-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-xs shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight text-ink">{t.name}</p>
                      <p className="text-[11px] text-ink-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
