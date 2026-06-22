"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ProductImage } from "@/components/product-image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee, Star, MapPin } from "lucide-react"
import { HERO_PRODUCTS } from "./hero"
import { useI18n } from "@/lib/i18n/context"

interface HeroCenteredProps {
  current: number
  setCurrent: (i: number) => void
  reduce: boolean | null
}

export function HeroCentered({ current, setCurrent, reduce }: HeroCenteredProps) {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center min-h-[70dvh] sm:min-h-dvh pt-20 pb-10 sm:pt-24 sm:pb-0">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-1.5 text-xs font-bold rounded-[16px] border-2 border-ink card-shadow-hard">
              <Coffee size={12} />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-[-0.04em] text-ink max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t("hero.title_1")}
            <br />
            <span className="text-brick">{t("hero.title_2")}</span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 justify-center mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link href="/katalog">
              <Button size="lg" className="text-base gap-2 group">
                {t("hero.cta")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#tentang">
              <Button variant="outline" size="lg" className="text-base">
                {t("hero.cta_alt")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="w-full max-w-5xl mt-10 sm:mt-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HERO_PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.id}
                  className={`relative overflow-hidden rounded-[16px] border-2 border-ink bg-card ${
                    i === current ? "card-shadow-hard" : "shadow-none"
                  } ${i === current ? "ring-2 ring-brick" : ""}`}
                  initial={false}
                  animate={reduce ? undefined : i === current ? { y: -4 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Link href={`/produk/${p.id}`} className="block">
                    <div className="relative aspect-[4/3]">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-3 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs truncate text-ink">{p.name}</h3>
                        <span className="flex items-center gap-0.5 text-brick text-[10px] font-bold">
                          <Star size={8} fill="currentColor" /> {p.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-ink-muted text-[10px]">
                        <MapPin size={8} />
                        <span>{p.origin}</span>
                      </div>
                      <p className="font-bold text-xs text-ink">Rp{p.price.toLocaleString("id-ID")}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {HERO_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all rounded-full border-2 border-ink ${
                    i === current
                      ? "w-8 h-4 bg-brick"
                      : "w-4 h-4 bg-card hover:bg-brick/50"
                  }`}
                  aria-label={`${t("aria.go_slide")} ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
