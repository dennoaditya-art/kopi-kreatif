"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, X } from "lucide-react"

interface FilterBarProps {
  categories: string[]
  roasts: string[]
  selectedCategory: string
  selectedRoast: string
  sortBy: string
  onCategoryChange: (v: string) => void
  onRoastChange: (v: string) => void
  onSortChange: (v: string) => void
}

export function FilterBar({
  categories,
  roasts,
  selectedCategory,
  selectedRoast,
  sortBy,
  onCategoryChange,
  onRoastChange,
  onSortChange,
}: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const hasFilters = selectedCategory || selectedRoast

  const filterBtn = (active: boolean) =>
    cn(
      "px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all",
      active
        ? "bg-primary text-white border-primary shadow-sm"
        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-primary/5 dark:hover:bg-zinc-800"
    )

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-bold"
        >
          <SlidersHorizontal size={14} />
          Filter
          {hasFilters && (
            <span className="h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">!</span>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400">Kategori:</span>
          <button
            onClick={() => onCategoryChange("")}
            className={filterBtn(!selectedCategory)}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={filterBtn(selectedCategory === cat)}
            >
              {cat.replace("-", " ")}
            </button>
          ))}

          <span className="ml-3 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400">Roast:</span>
          {roasts.map((roast) => (
            <button
              key={roast}
              onClick={() => onRoastChange(roast)}
              className={filterBtn(selectedRoast === roast)}
            >
              {roast}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">Terbaru</option>
          <option value="price-asc">Termurah</option>
          <option value="price-desc">Termahal</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-zinc-900 rounded-t-3xl p-5 space-y-4 shadow-xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm uppercase tracking-[0.1em]">Filter</span>
                <button onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center" aria-label="Tutup filter">
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Kategori</span>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => onCategoryChange("")} className={cn("px-2.5 py-1 text-[11px] font-bold rounded-lg border", !selectedCategory ? "bg-primary text-white border-primary" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700")}>Semua</button>
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => onCategoryChange(cat)} className={cn("px-2.5 py-1 text-[11px] font-bold rounded-lg border capitalize", selectedCategory === cat ? "bg-primary text-white border-primary" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700")}>{cat.replace("-", " ")}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Roast Level</span>
                <div className="flex flex-wrap gap-1.5">
                  {roasts.map((roast) => (
                    <button key={roast} onClick={() => onRoastChange(roast)} className={cn("px-2.5 py-1 text-[11px] font-bold rounded-lg border", selectedRoast === roast ? "bg-primary text-white border-primary" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700")}>{roast}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
