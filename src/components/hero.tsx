"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/coffee-data"
import { ArrowRight, Coffee, Star } from "lucide-react"

const HERO_PRODUCTS = products.slice(0, 4)

export function Hero() {
  const [current, setCurrent] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_PRODUCTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [reduce])

  const item = HERO_PRODUCTS[current]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F5EDE4] via-[#FDF6F0] to-[#F0EBE3] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full animate-blob blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full animate-blob blur-3xl" style={{ animationDelay: "3s", animationDirection: "reverse" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 min-h-dvh items-center py-16 lg:py-0">

          {/* Left: text content */}
          <div className="lg:col-span-6 space-y-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-ink text-white px-4 py-1.5 text-xs font-bold rounded-full border-2 border-ink card-shadow-hard">
                <Coffee size={12} />
                Fresh Roasted tiap Minggu
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-[-0.04em] text-balance"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Kopi Nusantara
              <br />
              <span className="text-primary stroke-ink tracking-tight">
                Asli Indonesia
              </span>
            </motion.h1>

            <motion.p
              className="max-w-md text-base sm:text-lg leading-relaxed text-[#5C4033] dark:text-zinc-400"
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
                <Button size="lg" className="text-base gap-2 group border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                  Jelajahi Katalog
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#tentang">
                <Button variant="outline" size="lg" className="text-base border-2 border-ink text-ink hover:bg-primary/10 dark:hover:bg-zinc-800">
                  Cerita Kami
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-5 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[{ val: "15+", label: "Daerah Kopi" }, { val: "4.9", label: "Rating" }, { val: "200+", label: "Varian" }].map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-2xl font-black text-ink">{s.val}</span>
                  <span className="text-xs text-[#5C4033]/70 dark:text-zinc-500 leading-tight">{s.label}</span>
                  {i < 2 && <div className="w-px h-6 bg-ink/10 ml-2" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: auto-rotating gallery */}
          <div className="lg:col-span-6 relative z-10 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative rotated square */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-3xl bg-primary border-2 border-ink card-shadow-hard rotate-12 flex items-center justify-center z-20">
                <span className="font-black text-ink text-sm -rotate-12">HOT!</span>
              </div>

              {/* Gallery frame */}
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink card-shadow-hard bg-white dark:bg-zinc-900">
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
                      <Image
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

                  {/* Product info overlay */}
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
                          <span className="flex items-center gap-1 text-primary text-xs font-bold">
                            <Star size={10} fill="currentColor" /> {item.rating}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-ink/5 dark:bg-zinc-800">
                  <motion.div
                    key={current}
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {HERO_PRODUCTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all rounded-full border-2 border-ink ${
                      i === current
                        ? "w-8 h-3 bg-primary"
                        : "w-3 h-3 bg-white dark:bg-zinc-700 hover:bg-primary/50"
                    }`}
                    aria-label={`Produk ${i + 1}`}
                  />
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-accent text-white rounded-2xl px-5 py-3 border-2 border-ink card-shadow-hard z-20"
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Promo</p>
                <p className="font-black text-lg">Gratis Ongkir</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
