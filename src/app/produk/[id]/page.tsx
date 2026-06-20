"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { FLAVOR_COLORS } from "@/components/product-card"
import { Star, ShoppingCart, ArrowLeft, Minus, Plus, Check, Frown, Package as PackageIcon, Truck, Flame } from "lucide-react"

export default function DetailProdukPage() {
  const params = useParams()
  const product = products.find((p) => p.id === params.id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedGrind, setSelectedGrind] = useState(product?.grind[0] || "")
  const [added, setAdded] = useState(false)
  const reduce = useReducedMotion()

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-3">
        <motion.div
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 dark:bg-zinc-800 text-zinc-400"
          animate={reduce ? undefined : { rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Frown size={22} />
        </motion.div>
        <h1 className="text-xl font-bold">Produk tidak ditemukan</h1>
        <Link href="/katalog"><Button>Kembali ke Katalog</Button></Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      grind: selectedGrind,
      weight: product.weight,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/katalog" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark mb-5 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Katalog
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-zinc-800 dark:to-zinc-800 shadow-xl"
            initial={reduce ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
            <motion.div
              className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold text-primary shadow-sm"
              animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {product.weight}
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {product.badge && <Badge>{product.badge}</Badge>}
                <span className="text-xs font-medium text-zinc-500">{product.weight}</span>
              </div>
              <h1 className="tracking-display text-3xl sm:text-4xl font-black">{product.name}</h1>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.06em]">{product.tagline}</p>
            </div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <motion.div
                className="flex items-center gap-0.5"
                whileHover={{ scale: 1.05 }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-secondary" : "text-zinc-200 dark:text-zinc-700"} />
                ))}
              </motion.div>
              <span className="text-xs font-bold">{product.rating}</span>
              <span className="text-xs text-zinc-500">({product.reviewCount} ulasan)</span>
            </motion.div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Flavor Notes</span>
              <div className="flex flex-wrap gap-1.5">
                {product.flavorNotes.map((note, ni) => {
                  const fc = FLAVOR_COLORS[note] || "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  return (
                  <motion.span
                    key={note}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + ni * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${fc} cursor-default`}
                  >
                    {note}
                  </motion.span>
                )})}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-zinc-800 dark:to-zinc-800 rounded-xl border border-primary/10 dark:border-zinc-700 p-3 card-shadow"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Roast Level</span>
                <p className="font-bold text-sm mt-0.5 text-primary">{product.roastLevel}</p>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-zinc-800 dark:to-zinc-800 rounded-xl border border-secondary/15 dark:border-zinc-700 p-3 card-shadow"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Origin</span>
                <p className="font-bold text-sm mt-0.5 text-secondary">{product.origin}</p>
              </motion.div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">Grind</span>
              <div className="flex flex-wrap gap-1.5">
                {product.grind.map((g, gi) => (
                  <motion.button
                    key={g}
                    onClick={() => setSelectedGrind(g)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + gi * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedGrind === g
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:bg-primary/5 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {g}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl h-11 bg-zinc-50 dark:bg-zinc-800/50">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center h-full min-w-[44px] px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-l-xl"
                  aria-label="Kurangi jumlah"
                >
                  <Minus size={14} />
                </motion.button>
                <motion.span
                  key={quantity}
                  className="px-4 font-bold text-sm min-w-[3ch] text-center"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center h-full min-w-[44px] px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-r-xl"
                  aria-label="Tambah jumlah"
                >
                  <Plus size={14} />
                </motion.button>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight">Rp{(product.price * quantity).toLocaleString("id-ID")}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-xs text-zinc-400 line-through">Rp{product.originalPrice.toLocaleString("id-ID")}</span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm gap-2"
                onClick={handleAddToCart}
              >
                {added ? <><motion.span initial={{ rotate: -45 }} animate={{ rotate: 0 }}><Check size={18} /></motion.span> Ditambahkan!</> : <><ShoppingCart size={18} /> Tambah ke Keranjang</>}
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-xs text-zinc-400 font-medium flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                className="flex items-center gap-1 text-secondary font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                <PackageIcon size={12} /> {product.stock > 10 ? "Stok tersedia" : `Sisa ${product.stock}`}
              </motion.span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <motion.span
                className="flex items-center gap-1 text-primary font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                <Truck size={12} /> Free shipping
              </motion.span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <motion.span
                className="flex items-center gap-1 text-accent font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                <Flame size={12} /> Fresh roasted
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.div
            className="mt-14 pt-10 border-t border-primary/10 dark:border-zinc-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="tracking-display text-xl sm:text-2xl font-black mb-5">
              Produk <span className="text-primary">Terkait</span>
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 15 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
