"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/coffee-data"
import { FLAVOR_COLORS } from "@/lib/coffee-data"

function getFlavorColor(note: string) {
  return FLAVOR_COLORS[note] || "bg-ink/5 text-ink-muted border-ink/10"
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
        className="block bg-card rounded-[16px] border-2 border-ink card-shadow-hard group-hover:card-shadow-hard-hover transition-all duration-200 h-full overflow-hidden"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
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
                product.badge === "Premium" ? "olive" : "brick"
              }>
                {product.badge}
              </Badge>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-ink/80 backdrop-blur-sm flex items-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
            <span className="text-paper text-[11px] font-bold uppercase tracking-widest whitespace-nowrap animate-marquee">
              Tambah ke Keranjang &bull; Tambah ke Keranjang &bull; Tambah ke Keranjang &bull;
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-sm leading-tight truncate group-hover:text-brick transition-colors text-ink">{product.name}</h3>
              <p className="text-[11px] text-ink-muted font-medium">{product.tagline}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold shrink-0 bg-brick/10 px-1.5 py-0.5 rounded-lg border border-brick/20">
              <Star size={10} fill="currentColor" className="text-brick" />
              <span className="text-ink">{product.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.flavorNotes.slice(0, 2).map((note) => (
              <span key={note} className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-transform hover:scale-110 hover:rotate-1 duration-200 ${getFlavorColor(note)}`}>
                {note}
              </span>
            ))}
            {product.flavorNotes.length > 2 && (
              <span className="inline-block px-2.5 py-1 rounded-full bg-ink/5 text-[10px] font-semibold text-ink-muted border border-ink/10">
                +{product.flavorNotes.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black tracking-tight text-ink">Rp{product.price.toLocaleString("id-ID")}</span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-[11px] text-ink-muted line-through">Rp{product.originalPrice.toLocaleString("id-ID")}</span>
              )}
            </div>
            <motion.button
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-ink text-paper flex items-center justify-center border-2 border-ink card-shadow-hard"
              whileHover={reduce ? undefined : { scale: 1.2, rotate: 10 }}
              whileTap={reduce ? undefined : { scale: 0.9, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 8 }}
              aria-label="Tambah ke keranjang"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); /* add to cart */ } }}
            >
              <ShoppingCart size={14} />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium">
            <span>{product.weight}</span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="text-ink font-bold">{product.roastLevel}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
