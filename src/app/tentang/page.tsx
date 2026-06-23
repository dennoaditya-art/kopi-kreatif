"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Coffee, Sprout, Heart, Award, Users, ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { usePageTitle } from "@/hooks/use-page-title"

const values = [
  { icon: Sprout, titleKey: "value_1_title", descKey: "value_1_desc", color: "bg-brick", iconColor: "text-ink" },
  { icon: Heart, titleKey: "value_2_title", descKey: "value_2_desc", color: "bg-olive", iconColor: "text-white" },
  { icon: Award, titleKey: "value_3_title", descKey: "value_3_desc", color: "bg-ink", iconColor: "text-paper" },
  { icon: Users, titleKey: "value_4_title", descKey: "value_4_desc", color: "bg-brick", iconColor: "text-ink" },
]

const timeline = [
  { year: "2018", titleKey: "timeline_1_title", descKey: "timeline_1_desc" },
  { year: "2019", titleKey: "timeline_2_title", descKey: "timeline_2_desc" },
  { year: "2021", titleKey: "timeline_3_title", descKey: "timeline_3_desc" },
  { year: "2023", titleKey: "timeline_4_title", descKey: "timeline_4_desc" },
  { year: "2026", titleKey: "timeline_5_title", descKey: "timeline_5_desc" },
]

const stats = [
  { val: "1.200+", labelKey: "stat_1" },
  { val: "15", labelKey: "stat_2" },
  { val: "200+", labelKey: "stat_3" },
  { val: "20rb+", labelKey: "stat_4" },
]

export default function TentangPage() {
  const { t } = useI18n()
  usePageTitle(t("tentang.page_title"))
  const reduce = useReducedMotion()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brick/10 dark:bg-brick/[0.05]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="card-shadow-hard mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-surface-ink dark:border-ink/20">
              <Heart size={12} />
              {t("tentang.badge")}
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">
              {t("tentang.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-muted dark:text-ink-muted/80">
              {t("tentang.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-2 border-ink bg-white py-10 dark:bg-surface-alt-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.labelKey}
                className="text-center"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-3xl font-black text-brick sm:text-4xl">{s.val}</p>
                <p className="mt-1 text-xs font-bold text-ink-muted">{t(`tentang.${s.labelKey}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="space-y-5"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black leading-[1.1] tracking-display sm:text-4xl">
                {t("tentang.perjalanan_title")} <span className="text-brick">KOPI</span>
              </h2>
              <p className="text-sm leading-relaxed text-ink-muted dark:text-ink-muted/80">
                {t("tentang.story_p1")}
              </p>
              <p className="text-sm leading-relaxed text-ink-muted dark:text-ink-muted/80">
                {t("tentang.story_p2")}
              </p>
              <Link href="/katalog">
                <Button className="gap-2">
                  {t("tentang.mulai_jelajahi")}
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="card-shadow-hard relative overflow-hidden rounded-[2rem] border-2 border-ink"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop"
                  alt="Kopi Nusantara"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold text-white/70">{t("tentang.overlay_brand")}</p>
                <p className="text-lg font-black text-white">{t("tentang.overlay_tagline")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-alt-ink/60 py-16 dark:bg-surface-alt-ink/30 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-display sm:text-4xl">
              {t("tentang.values_title")}
            </h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.titleKey}
                className="card-shadow-hard rounded-2xl border-2 border-ink bg-white p-6 transition-all duration-200 hover:card-shadow-hard-hover dark:bg-surface-alt-ink"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${v.color} ${v.iconColor} card-shadow-hard`}>
                  <v.icon size={20} />
                </div>
                <h3 className="font-black text-ink dark:text-white">{t(`tentang.${v.titleKey}`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted/80">{t(`tentang.${v.descKey}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-display sm:text-4xl">
              {t("tentang.timeline_title")}
            </h2>
          </motion.div>
          <div className="relative space-y-0">
            <div className="absolute left-[19px] top-0 h-full w-0.5 bg-ink/30 dark:bg-white/10" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-white text-xs font-black text-ink card-shadow-hard dark:bg-surface-alt-ink dark:text-white">
                  {item.year.slice(2)}
                </div>
                <div className="pt-1">
                  <h3 className="font-black text-ink dark:text-white">{t(`tentang.${item.titleKey}`)}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted/80">{t(`tentang.${item.descKey}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-ink bg-brick-deep py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            className="space-y-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Coffee size={32} className="mx-auto text-on-brick-deep" />
            <h2 className="text-3xl font-black text-on-brick-deep tracking-display sm:text-4xl">
              {t("tentang.cta_title")}
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-on-brick-deep">
              {t("tentang.cta_caption")}
            </p>
            <Link href="/katalog">
              <Button
                size="lg"
                className="border-2 border-ink bg-ink text-white dark:bg-card dark:text-ink dark:border-ink/20 card-shadow-hard hover:card-shadow-hard-hover"
              >
                {t("tentang.belanja_sekarang")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
