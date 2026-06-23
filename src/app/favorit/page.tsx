"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"
import { Heart, ShoppingCart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"

export default function FavoritPage() {
  usePageTitle("Favorit — KOPI Nusantara")
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: 1,
      grind: "V60",
      weight: item.weight,
      image: item.image,
    })
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
        <EmptyState
          icon={<Heart size={40} />}
          title={t("katalog.favoritmu")}
          description={t("katalog.favorit_kosong_desc")}
          action={<Link href="/katalog"><Button className="gap-2"><ShoppingBag size={16} />{t("keranjang.lihat_katalog")}</Button></Link>}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Link href="/katalog" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-card text-ink hover:bg-brick/10 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              {t("katalog.favoritmu")}
            </h1>
            <p className="text-sm text-ink-muted">{items.length} {t("hero.produk")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="group bg-card rounded-[16px] border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden"
            >
              <Link href={`/produk/${item.id}`} className="block relative aspect-[4/3] overflow-hidden bg-paper-alt">
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
                <button
                  onClick={(e) => { e.preventDefault(); removeItem(item.id) }}
                  className="absolute top-2 right-2 h-8 w-8 rounded-lg bg-card/90 backdrop-blur-sm border border-ink flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                  aria-label={t("keranjang.hapus")}
                >
                  <Trash2 size={14} />
                </button>
              </Link>
              <div className="p-3 sm:p-4 space-y-2">
                <Link href={`/produk/${item.id}`}>
                  <h3 className="font-bold text-sm truncate group-hover:text-brick transition-colors">{item.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-black text-sm">Rp{item.price.toLocaleString("id-ID")}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-ink-muted line-through ml-1.5">Rp{item.originalPrice.toLocaleString("id-ID")}</span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={addedId === item.id ? "olive" : "default"}
                  className="w-full text-xs gap-1.5"
                  onClick={() => handleAddToCart(item)}
                >
                  {addedId === item.id ? (
                    <><ShoppingCart size={12} className="animate-bounce" /> {t("produk.ditambahkan")}</>
                  ) : (
                    <><ShoppingCart size={12} /> {t("produk.tambah")}</>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
