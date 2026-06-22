"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ProductImage } from "@/components/product-image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/coffee-data"
import { ArrowRight, Coffee, Star } from "lucide-react"
import { HERO_PRODUCTS } from "./hero"

interface HeroDefaultProps {
  current: number
  setCurrent: (i: number) => void
  item: Product
  reduce: boolean | null
}

export function HeroDefault({ current, setCurrent, item, reduce }: HeroDefaultProps) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 min-h-[70dvh] sm:min-h-dvh items-start lg:items-center pt-20 pb-10 sm:py-16 lg:py-0">

          <div className="lg:col-span-5 space-y-5 sm:space-y-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-1.5 text-xs font-bold rounded-[16px] border-2 border-ink card-shadow-hard">
                <Coffee size={12} />
                Fresh Roasted tiap Minggu
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-[-0.04em] text-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Kopi Nusantara
              <br />
              <span className="text-brick">Asli Indonesia</span>
            </motion.h1>

            <motion.p
              className="max-w-md text-base sm:text-lg leading-relaxed text-ink-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Bubuk kopi premium dari petani lokal Indonesia. Dipanggang segar setiap minggu.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link href="/katalog">
                <Button size="lg" className="text-base gap-2 group">
                  Jelajahi Katalog
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#tentang">
                <Button variant="outline" size="lg" className="text-base">
                  Cerita Kami
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 relative z-10 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 rounded-[16px] bg-brick border-2 border-ink card-shadow-hard rotate-12 flex items-center justify-center z-20">
                <span className="font-black text-ink text-[10px] sm:text-sm -rotate-12">HOT!</span>
              </div>

              <div className="relative overflow-hidden rounded-[24px] border-2 border-ink card-shadow-hard bg-card">
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
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
                        <h3 className="text-white font-black text-xl">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white font-bold text-sm">Rp{item.price.toLocaleString("id-ID")}</span>
                          <span className="flex items-center gap-1 text-brick text-xs font-bold">
                            <Star size={10} fill="currentColor" /> {item.rating}
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
                    aria-label={`Produk ${i + 1}`}
                  />
                ))}
              </div>

              <motion.div
                className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-olive text-white rounded-[16px] px-3 py-2 sm:px-5 sm:py-3 border-2 border-ink card-shadow-hard z-20"
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-bold">Promo</p>
                <p className="font-black text-sm sm:text-lg">Gratis Ongkir</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
