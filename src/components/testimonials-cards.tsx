"use client"

import { motion, useReducedMotion } from "motion/react"
import { testimonials } from "@/lib/coffee-data"
import { Star } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const INITIALS_BG = ["bg-brick text-ink", "bg-olive text-white", "bg-ink text-paper", "bg-brick text-white"]

export function TestimonialsCards() {
  const reduce = useReducedMotion()
  const { t } = useI18n()

  return (
    <section className="py-16 sm:py-20 bg-paper-alt relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-ink">
            {t("testimonials.title_start")} <span className="text-brick">{t("testimonials.title_end")}</span>
          </h2>
          <p className="text-sm text-ink-muted mt-1">
            {t("testimonials.desc")}
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
              className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200 space-y-3 flex flex-col"
            >
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
                <div className={`h-8 w-8 rounded-full ${INITIALS_BG[i]} flex items-center justify-center font-bold text-xs shrink-0`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-ink">{t.name}</p>
                  <p className="text-[11px] text-ink-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
