"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Loader2 } from "lucide-react"
import type { Product } from "@/lib/coffee-data"
import { FLAVOR_COLORS } from "@/lib/coffee-data"

function getFlavorColor(note: string) {
  return FLAVOR_COLORS[note] || "bg-ink/5 text-ink-muted border-ink/10"
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const { t } = useI18n()
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const { toast } = useToast()
  const reduce = useReducedMotion()
  const [addingId, setAddingId] = useState<string | null>(null)

  function handleCardClick() {
    router.push(`/produk/${product.id}`)
  }

  const handleAddCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (addingId) return
    setAddingId(product.id)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      grind: product.grind[0],
      weight: product.weight,
      image: product.image,
    })
    setTimeout(() => {
      setAddingId(null)
      toast(`${product.name} ${t("produk.ditambahkan")}`, "success")
    }, 600)
  }, [product, addItem, t, toast, addingId])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      router.push(`/produk/${product.id}`)
    }
  }

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      className="group"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        className="block bg-card rounded-[16px] border-2 border-ink card-shadow-hard group-hover:card-shadow-hard-hover transition-all duration-200 h-full overflow-hidden cursor-pointer"
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

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleItem({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, weight: product.weight, category: product.category })
            }}
            className="absolute top-3 right-3 h-9 w-9 rounded-lg bg-card/90 backdrop-blur-sm border-2 border-ink flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            aria-label={t("produk.favorit")}
          >
            <Heart size={16} className={isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-ink"} />
          </button>

          <button
            onClick={handleAddCart}
            className="absolute bottom-0 left-0 right-0 h-8 bg-ink/80 backdrop-blur-sm items-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex cursor-pointer w-full"
            aria-label={t("produk.tambah")}
          >
            <span className="text-paper text-[11px] font-bold uppercase tracking-widest whitespace-nowrap animate-marquee">
              {t("produk.tambah")} &bull; {t("produk.tambah")} &bull; {t("produk.tambah")} &bull;
            </span>
          </button>
        </div>

        <div className="p-3.5 sm:p-4 space-y-2.5 sm:space-y-3">
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
              onClick={handleAddCart}
              className="h-10 w-10 rounded-lg bg-ink text-paper flex items-center justify-center border-2 border-ink card-shadow-hard"
              whileHover={reduce ? undefined : { scale: 1.2, rotate: 10 }}
              whileTap={reduce ? undefined : { scale: 0.9, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 8 }}
              aria-label={t("produk.tambah")}
              disabled={addingId === product.id}
            >
              {addingId === product.id ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium">
            <span>{product.weight}</span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="text-ink font-bold">{product.roastLevel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
