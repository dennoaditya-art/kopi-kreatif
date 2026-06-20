"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee } from "lucide-react"

export function FeaturedProducts() {
  const reduce = useReducedMotion()
  const featured = products.slice(0, 8)

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-surface-alt/50 dark:from-zinc-950 dark:to-zinc-900/50 overflow-hidden relative">
      <motion.div
        className="absolute top-20 right-10 text-secondary/15 text-6xl select-none pointer-events-none"
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Coffee size={32} />
      </motion.div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="tracking-display text-3xl sm:text-4xl font-black">
              Pilihan <span className="text-primary">Terbaik</span>
            </h2>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/katalog">
              <Button variant="outline" size="sm" className="gap-2 text-xs group">
                Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 100, damping: 15 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
