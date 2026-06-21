"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart, itemKey } from "@/lib/cart-context"
import { useToast } from "@/components/ui/toast"
import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft, Tag, Coffee, Loader2 } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

export default function KeranjangPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponLoading, setCouponLoading] = useState(false)
  const reduce = useReducedMotion()
  const { toast } = useToast()

  const discount = couponApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 100000 ? 0 : 12000
  const total = subtotal - discount + shipping

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <motion.div
          className="flex items-center gap-2.5 mb-8"
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-9 w-9 rounded-xl bg-brick text-white flex items-center justify-center">
            <ShoppingCart size={18} />
          </div>
          <h1 className="tracking-display text-2xl sm:text-3xl font-black">Keranjang</h1>
        </motion.div>

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={32} />}
            title="Keranjang masih kosong"
            description="Belum ada kopi yang dipilih. Yuk jelajahi katalog dan temukan favoritmu!"
            action={
              <Link href="/katalog">
                <Button className="gap-2 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover">
                  <Coffee size={16} />
                  Lihat Katalog
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
              {items.map((item) => {
                const key = itemKey(item.id, item.grind)
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-4 flex flex-col sm:flex-row gap-3 card-shadow-hard hover:shadow-lg transition-shadow"
                  >
                  <div className="h-20 w-20 shrink-0 relative rounded-xl overflow-hidden bg-brick/10 dark:bg-surface-ink">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-xs text-ink-muted font-medium">{item.grind} — {item.weight}</p>
                      </div>
                      <motion.button
                        onClick={() => removeItem(key)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg"
                        aria-label="Hapus item"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center border border-ink/10 dark:border-ink/20 rounded-lg h-9 bg-zinc-50 dark:bg-surface-ink/50">
                        <motion.button
                          onClick={() => updateQuantity(key, -1)}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center h-full min-w-[36px] px-1.5 hover:bg-zinc-100 dark:hover:bg-surface-alt-ink rounded-l-lg transition-colors"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus size={12} />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          className="px-3 font-bold text-xs"
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          onClick={() => updateQuantity(key, 1)}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center h-full min-w-[36px] px-1.5 hover:bg-zinc-100 dark:hover:bg-surface-alt-ink rounded-r-lg transition-colors"
                          aria-label="Tambah jumlah"
                        >
                          <Plus size={12} />
                        </motion.button>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-sm">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                        {item.originalPrice && <><br /><span className="text-xs text-ink-muted line-through">Rp{item.originalPrice.toLocaleString("id-ID")}</span></>}
                      </div>
                    </div>
                  </div>
                  </motion.div>
                )
              })}
              </AnimatePresence>
              <Link href="/katalog" className="inline-flex items-center gap-1.5 text-xs font-bold text-brick hover:text-brick-deep transition-colors group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Lanjut Belanja
              </Link>
            </div>

            <div className="space-y-3">
              <motion.div
                className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-5 space-y-4 card-shadow-hard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 15 }}
              >
                <h2 className="font-bold text-base">Ringkasan Belanja</h2>
                <div className="space-y-2.5 text-sm">
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={`subtotal-${subtotal}`}
                  >
                    <span className="text-ink-muted">Subtotal</span>
                    <span className="font-bold">Rp{subtotal.toLocaleString("id-ID")}</span>
                  </motion.div>
                  {discount > 0 && (
                    <motion.div
                      className="flex justify-between text-brick"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <span>Diskon (10%)</span>
                      <span className="font-bold">-Rp{discount.toLocaleString("id-ID")}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Ongkos Kirim</span>
                    <span className="font-bold">{shipping === 0 ? <span className="text-brick font-black">GRATIS</span> : `Rp${shipping.toLocaleString("id-ID")}`}</span>
                  </div>
                  <hr className="border-t border-brick/10 dark:border-ink/20" />
                  <motion.div
                    className="flex justify-between text-lg"
                    key={`total-${total}`}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                  >
                    <span className="font-bold">Total</span>
                    <span className="font-black text-brick">Rp{total.toLocaleString("id-ID")}</span>
                  </motion.div>
                </div>
                <div className="flex gap-2">
                  <Input type="text" placeholder="Kode promo" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="text-sm h-10" />
                  <Button size="sm" variant={couponApplied ? "brick" : "outline"} onClick={async () => {
                    if (couponLoading) return
                    setCouponLoading(true)
                    await new Promise((r) => setTimeout(r, 800))
                    const next = !couponApplied
                    setCouponApplied(next)
                    setCouponLoading(false)
                    if (next) toast("Kode promo berhasil digunakan! Diskon 10%", "success")
                  }} disabled={(!coupon && !couponApplied) || couponLoading} className="gap-1 shrink-0 text-xs">
                    {couponLoading ? <Loader2 size={13} className="animate-spin" /> : <Tag size={13} />}
                    {couponLoading ? "Memeriksa..." : couponApplied ? "Pakai" : "Gunakan"}
                  </Button>
                </div>
                {shipping > 0 && <p className="text-xs text-ink-muted text-center">Gratis ongkir untuk belanja minimal Rp100.000</p>}
                <Link href="/checkout"><Button className="w-full text-sm gap-2" size="lg">Lanjut ke Checkout</Button></Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
