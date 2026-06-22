"use client"

import { motion, useReducedMotion } from "motion/react"
import { Sprout, Leaf, MapPin, BadgeCheck } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function StorySection() {
  const reduce = useReducedMotion()
  const { t } = useI18n()

  const values = [
  { icon: Sprout, title: t("story.value_1_title"), desc: t("story.value_1_desc") },
  { icon: Leaf, title: t("story.value_2_title"), desc: t("story.value_2_desc") },
  { icon: MapPin, title: t("story.value_3_title"), desc: t("story.value_3_desc") },
  { icon: BadgeCheck, title: t("story.value_4_title"), desc: t("story.value_4_desc") },
]

  return (
    <section id="tentang" className="py-16 sm:py-20 bg-paper-alt relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Left: statement block */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-24 space-y-5"
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] text-ink">
              {t("story.title_start")} <span className="text-brick">{t("story.title_end")}</span>
            </h2>
            <p className="text-ink-muted leading-relaxed text-sm sm:text-base">
              {t("story.desc")}
            </p>
            <div className="inline-block rounded-[16px] bg-brick-deep border-2 border-ink card-shadow-hard px-6 py-4">
              <p className="text-2xl font-black text-on-brick-deep">&gt; 15+</p>
              <p className="text-xs font-bold text-on-brick-deep opacity-80">{t("story.daerah")}</p>
            </div>
          </motion.div>

          {/* Right: staggered value cards */}
          <div className="lg:col-span-3 space-y-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={reduce ? undefined : { x: 4, y: -4 }}
                className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-[12px] bg-ink text-paper flex items-center justify-center border-2 border-ink">
                    <value.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink">{value.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed mt-1">{value.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
