"use client"

import { useState, useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { ProductCard } from "@/components/product-card"
import { Search, SearchX, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

const allCategories = Array.from(new Set(products.map((p) => p.category)))
const allRoasts = Array.from(new Set(products.map((p) => p.roastLevel)))

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 } as const,
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function KatalogPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [roast, setRoast] = useState("")
  const [sort, setSort] = useState("")
  const reduce = useReducedMotion()

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.flavorNotes.some((f) => f.toLowerCase().includes(q))
      )
    }
    if (category) result = result.filter((p) => p.category === category)
    if (roast) result = result.filter((p) => p.roastLevel === roast)
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price)
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating)
    return result
  }, [search, category, roast, sort])

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          className="mb-8"
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="tracking-display text-3xl sm:text-4xl font-black">
            Pilih Kopi <span className="text-brick">Favoritmu</span>
          </h1>
          <p className="text-sm text-ink-muted dark:text-ink-muted max-w-lg mt-1">
            Dari Sabang sampai Merauke, setiap biji punya cerita.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-5"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <Input
              type="text"
              placeholder="Cari kopi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm h-10 w-full"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-ink/10 dark:border-ink/20 px-3 py-2 text-xs font-bold bg-white dark:bg-surface-alt-ink cursor-pointer focus:ring-2 focus:ring-brick focus:outline-none h-10 shrink-0"
          >
            <option value="">Urutkan: Terbaru</option>
            <option value="price-asc">Termurah</option>
            <option value="price-desc">Termahal</option>
            <option value="rating">Rating</option>
          </select>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-1.5 mb-5"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <motion.button
            onClick={() => setCategory("")}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              !category
                ? "bg-brick text-white border-brick shadow-sm"
                : "bg-white dark:bg-surface-alt-ink border-ink/10 dark:border-ink/20 hover:bg-brick/5"
            }`}
          >
            Semua
          </motion.button>
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all capitalize ${
                category === cat
                  ? "bg-brick text-white border-brick shadow-sm"
                  : "bg-white dark:bg-surface-alt-ink border-ink/10 dark:border-ink/20 hover:bg-brick/5"
              }`}
            >
              {cat.replace("-", " ")}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-between mb-5"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-xs text-ink-muted font-medium">
            Menampilkan {filtered.length} dari {products.length} produk
          </p>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">Roast:</span>
            {allRoasts.map((r) => (
              <motion.button
                key={r}
                onClick={() => setRoast(roast === r ? "" : r)}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                  roast === r
                    ? "bg-brick text-white border-brick shadow-sm"
                    : "bg-white dark:bg-surface-alt-ink border-ink/10 dark:border-ink/20 hover:bg-brick/5"
                }`}
              >
                {r}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<SearchX size={32} />}
            title="Kopi tidak ditemukan"
            description="Coba kata kunci lain atau atur ulang filter untuk melihat semua produk."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSearch(""); setCategory(""); setRoast("") }}
                className="gap-2 border-2 border-ink"
              >
                <RotateCcw size={14} />
                Atur Ulang Filter
              </Button>
            }
          />
        ) : (
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
