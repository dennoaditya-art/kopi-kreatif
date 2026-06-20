"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/coffee-data"

export const FLAVOR_COLORS: Record<string, string> = {
  Chocolate: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300",
  "Dark Chocolate": "bg-amber-100 text-amber-800 border-amber-200",
  Caramel: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Brown Sugar": "bg-amber-100 text-amber-800 border-amber-200",
  Spicy: "bg-orange-100 text-orange-800 border-orange-200",
  Nutty: "bg-amber-100 text-amber-800 border-amber-200",
  Floral: "bg-pink-100 text-pink-800 border-pink-200",
  Fruity: "bg-rose-100 text-rose-800 border-rose-200",
  Citrus: "bg-lime-100 text-lime-800 border-lime-200",
  Berry: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  Lemon: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Jeruk Bali": "bg-orange-100 text-orange-800 border-orange-200",
  "Gula Aren": "bg-amber-100 text-amber-800 border-amber-200",
  Tropical: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Earthy: "bg-stone-100 text-stone-800 border-stone-200",
  Herbal: "bg-green-100 text-green-800 border-green-200",
  Wine: "bg-purple-100 text-purple-800 border-purple-200",
  "Red Apple": "bg-red-100 text-red-800 border-red-200",
  "Creamy": "bg-amber-50 text-amber-700 border-amber-200",
}

function getFlavorColor(note: string) {
  return FLAVOR_COLORS[note] || "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
}

const CARD_HOVER_BG: Record<string, string> = {
  "single-origin": "group-hover:from-secondary/20 group-hover:via-primary/10 group-hover:to-transparent",
  blends: "group-hover:from-accent/20 group-hover:via-primary/10 group-hover:to-transparent",
  specialty: "group-hover:from-tertiary/20 group-hover:via-primary/10 group-hover:to-transparent",
}

export function ProductCard({ product }: { product: Product }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      className="group"
    >
      <Link
        href={`/produk/${product.id}`}
        className="block bg-white dark:bg-zinc-900 rounded-2xl border-2 border-ink card-shadow-hard group-hover:card-shadow-hard-hover transition-all duration-200 h-full overflow-hidden"
      >
        <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 dark:from-zinc-800 dark:to-zinc-800 overflow-hidden">
          {/* Hover bg shift */}
          <div className={`absolute inset-0 transition-colors duration-300 ${CARD_HOVER_BG[product.category] || "group-hover:bg-primary/10"}`} />

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={
                product.badge === "Best Seller" ? "default" :
                product.badge === "Diskon" ? "secondary" :
                product.badge === "Premium" ? "accent" : "default"
              } className="border border-ink">
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Marquee ADD TO CART */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-ink/80 backdrop-blur-sm flex items-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-[11px] font-bold uppercase tracking-widest whitespace-nowrap animate-marquee">
              Tambah ke Keranjang &bull; Tambah ke Keranjang &bull; Tambah ke Keranjang &bull;
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-sm leading-tight truncate group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{product.tagline}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold shrink-0 bg-secondary/10 dark:bg-secondary/20 px-1.5 py-0.5 rounded-lg border border-secondary/20">
              <Star size={10} fill="currentColor" className="text-secondary" />
              <span>{product.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.flavorNotes.slice(0, 2).map((note) => (
              <span key={note} className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-transform hover:scale-110 hover:rotate-1 duration-200 ${getFlavorColor(note)}`}>
                {note}
              </span>
            ))}
            {product.flavorNotes.length > 2 && (
              <span className="inline-block px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                +{product.flavorNotes.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black tracking-tight">Rp{product.price.toLocaleString("id-ID")}</span>
              {product.originalPrice && (
                <span className="text-[11px] text-zinc-400 line-through">Rp{product.originalPrice.toLocaleString("id-ID")}</span>
              )}
            </div>
            <motion.div
              className="h-9 w-9 rounded-lg bg-ink text-white flex items-center justify-center cursor-pointer border border-ink card-shadow-hard"
              whileHover={reduce ? undefined : { scale: 1.2, rotate: 10 }}
              whileTap={reduce ? undefined : { scale: 0.9, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 8 }}
              aria-label="Tambah ke keranjang"
            >
              <ShoppingCart size={14} />
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
            <span>{product.weight}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="text-ink font-bold">{product.roastLevel}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
