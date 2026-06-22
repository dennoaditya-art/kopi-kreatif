"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ProductImage } from "@/components/product-image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/coffee-data"
import { ArrowRight, Coffee, Star } from "lucide-react"
import { HERO_PRODUCTS } from "./hero"
import { useI18n } from "@/lib/i18n/context"

interface HeroSplitProps {
  current: number
  setCurrent: (i: number) => void
  item: Product
}

export function HeroSplit({ current, setCurrent, item }: HeroSplitProps) {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 min-h-[70dvh] sm:min-h-dvh items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">

          <div className="space-y-6 sm:space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-1.5 text-xs font-bold rounded-[16px] border-2 border-ink card-shadow-hard">
                <Coffee size={12} />
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(3rem,10vw,6rem)] font-black leading-[0.85] tracking-[-0.05em] text-ink"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="block">Kopi</span>
              <span className="block text-brick">Nusantara</span>
              <span className="block text-ink mt-1 text-[clamp(1rem,2vw,1.5rem)] tracking-[-0.02em] font-bold">
                {t("hero.title_2")}
              </span>
            </motion.h1>

            <motion.p
              className="max-w-md text-base sm:text-lg leading-relaxed text-ink-muted"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("hero.desc")}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
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
              className="flex gap-4 sm:gap-6 pt-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <p className="font-black text-2xl text-ink">50+</p>
                <p className="text-xs text-ink-muted font-bold uppercase tracking-wider">{t("hero.varian_kopi")}</p>
              </div>
              <div>
                <p className="font-black text-2xl text-brick">12rb+</p>
                <p className="text-xs text-ink-muted font-bold uppercase tracking-wider">{t("hero.pelanggan")}</p>
              </div>
              <div>
                <p className="font-black text-2xl text-ink">5.0</p>
                <p className="text-xs text-ink-muted font-bold uppercase tracking-wider">{t("hero.rating_rata")}</p>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-[16px] bg-olive border-2 border-ink card-shadow-hard -rotate-6 flex items-center justify-center z-20">
                <span className="font-black text-white text-sm -rotate-6">#1</span>
              </div>

              <div className="relative overflow-hidden rounded-[24px] border-2 border-ink card-shadow-hard bg-card">
                <div className="relative aspect-square">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={item.id + "-info"}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{item.category.replace("-", " ")}</p>
                        <h3 className="text-white font-black text-2xl">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white font-bold text-lg">Rp{item.price.toLocaleString("id-ID")}</span>
                          <span className="flex items-center gap-1 text-brick text-xs font-bold">
                            <Star size={12} fill="currentColor" /> {item.rating}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="h-1 bg-ink/5">
                  <motion.div
                    key={current}
                    className="h-full bg-brick"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
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
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
