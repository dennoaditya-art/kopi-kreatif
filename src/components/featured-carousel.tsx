"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react"

const featured = products.slice(0, 8)

interface FeaturedCarouselProps {
  header?: ReactNode
}

export function FeaturedCarousel({ header }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const reduce = useReducedMotion()

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section className="py-16 sm:py-20 bg-paper relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {header ?? (
          <div className="flex items-end justify-between gap-4 mb-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
                Pilihan <span className="text-brick">Terbaik</span>
              </h2>
              <p className="text-sm text-ink-muted mt-1">Koleksi pilihan kami untuk kamu</p>
            </motion.div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="h-10 w-10 rounded-[12px] border-2 border-ink bg-card text-ink flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brick/10 transition-colors"
                aria-label="Geser ke kiri"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="h-10 w-10 rounded-[12px] border-2 border-ink bg-card text-ink flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brick/10 transition-colors"
                aria-label="Geser ke kanan"
              >
                <ChevronRight size={16} />
              </button>
              <Link href="/katalog">
                <Button variant="outline" size="sm" className="gap-2 text-xs group ml-2">
                  Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none"
        >
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-center shrink-0 w-[75vw] sm:w-[280px]"
            >
              <Link
                href={`/produk/${product.id}`}
                className="group block bg-card rounded-[16px] border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200 h-full hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 640px) 75vw, 280px"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant={
                        product.badge === "Best Seller" ? "default" :
                        product.badge === "Premium" ? "olive" : "brick"
                      }>
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm leading-tight group-hover:text-brick transition-colors text-ink">
                        {product.name}
                      </h3>
                      <p className="text-[12px] text-ink-muted font-medium">{product.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold shrink-0 bg-brick/10 px-1.5 py-0.5 rounded-lg border border-brick/20">
                      <Star size={10} fill="currentColor" className="text-brick" />
                      <span className="text-ink">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-black tracking-tight text-ink text-base">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-ink-muted line-through">
                        Rp{product.originalPrice.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium">
                    <span>{product.weight}</span>
                    <span className="w-1 h-1 rounded-full bg-ink/20" />
                    <span className="font-bold">{product.roastLevel}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-[12px] border-2 border-ink bg-card text-ink flex items-center justify-center disabled:opacity-30"
            aria-label="Geser ke kiri"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-[12px] border-2 border-ink bg-card text-ink flex items-center justify-center disabled:opacity-30"
            aria-label="Geser ke kanan"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
