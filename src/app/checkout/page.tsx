"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/toast"
import { CreditCard, MapPin, Package, ArrowLeft, Check, ShoppingCart, Coffee, Loader2 } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const reduce = useReducedMotion()
  const { toast } = useToast()

  if (submitted) {
    return (
      <div>
          <motion.div
            className="mx-auto max-w-xl px-4 pt-20 sm:pt-24 pb-16 text-center space-y-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.div
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brick text-white shadow-lg shadow-secondary/20"
            animate={reduce ? undefined : { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Check size={32} />
          </motion.div>
          <h1 className="tracking-display text-2xl sm:text-3xl font-black">Pesanan Berhasil!</h1>
          <p className="text-sm text-ink-muted dark:text-ink-muted max-w-sm mx-auto">
            Pesanan kamu sedang diproses. Kami akan kirim konfirmasi melalui email dalam beberapa saat.
          </p>
          <motion.div
            className="rounded-2xl bg-white dark:bg-surface-alt-ink border border-brick/10 dark:border-ink/20 p-4 text-left text-sm space-y-1.5 max-w-xs mx-auto shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p><span className="font-bold">No. Pesanan:</span> #INV-20260618</p>
            <p><span className="font-bold">Estimasi:</span> 3-5 hari kerja</p>
            <p><span className="font-bold">Pembayaran:</span> Transfer Bank BCA</p>
          </motion.div>
          <div className="flex gap-3 justify-center">
            <Link href="/"><Button variant="outline">Kembali ke Beranda</Button></Link>
            <Link href="/katalog"><Button>Belanja Lagi</Button></Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0 && !submitted) {
    return (
      <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
          <EmptyState
            icon={<ShoppingCart size={32} />}
            title="Tidak ada item untuk di-checkout"
            description="Keranjang belanja kamu masih kosong. Isi dulu dengan kopi pilihanmu!"
            action={
              <Link href="/katalog">
                <Button className="gap-2 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover">
                  <Coffee size={16} />
                  Lihat Katalog
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          className="flex items-center gap-2.5 mb-8"
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-9 w-9 rounded-xl bg-brick text-white flex items-center justify-center">
            <CreditCard size={18} />
          </div>
          <h1 className="tracking-display text-2xl sm:text-3xl font-black">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-5 space-y-4 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-brick/10 dark:bg-brick/20 flex items-center justify-center">
                  <MapPin size={14} className="text-brick" />
                </div>
                <h2 className="font-bold text-sm">Alamat Pengiriman</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Nama Lengkap" defaultValue="Rina Wijaya" className="text-sm h-10" />
                <Input type="tel" placeholder="No. Telepon" defaultValue="081234567890" className="text-sm h-10" />
                <div className="sm:col-span-2">
                  <Input placeholder="Alamat Lengkap" defaultValue="Jl. Kopi Nikmat No. 123, RT 05 RW 03" className="text-sm h-10" />
                </div>
                <Input placeholder="Kota" defaultValue="Jakarta Selatan" className="text-sm h-10" />
                <Input placeholder="Kode Pos" defaultValue="12950" className="text-sm h-10" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/15 dark:border-ink/20 p-5 space-y-3 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-brick/10 dark:bg-brick/20 flex items-center justify-center">
                  <Package size={14} className="text-brick" />
                </div>
                <h2 className="font-bold text-sm">Metode Pengiriman</h2>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Reguler", est: "3-5 hari", price: 12000 },
                  { label: "Express", est: "1-2 hari", price: 25000 },
                  { label: "Same Day", est: "6-8 jam", price: 45000 },
                ].map((method) => (
                  <motion.label
                    key={method.label}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 dark:border-ink/20 cursor-pointer hover:bg-brick/5 dark:hover:bg-surface-alt-ink transition-colors has-[:checked]:bg-brick/5 has-[:checked]:border-brick dark:has-[:checked]:bg-brick/10"
                  >
                    <input type="radio" name="shipping" defaultChecked={method.label === "Reguler"} className="h-4 w-4 accent-brick" />
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm">{method.label}</span>
                        <p className="text-xs text-ink-muted">{method.est}</p>
                      </div>
                      <span className="font-bold text-sm">Rp{method.price.toLocaleString("id-ID")}</span>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-olive/15 dark:border-ink/20 p-5 space-y-3 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-olive/10 dark:bg-olive/20 flex items-center justify-center">
                  <CreditCard size={14} className="text-olive" />
                </div>
                <h2 className="font-bold text-sm">Pembayaran</h2>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Transfer BCA", detail: "Virtual Account" },
                  { label: "Transfer Mandiri", detail: "Virtual Account" },
                  { label: "GoPay", detail: "E-Wallet" },
                  { label: "COD", detail: "Bayar di Tempat" },
                ].map((pay) => (
                  <motion.label
                    key={pay.label}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-ink/10 dark:border-ink/20 cursor-pointer hover:bg-olive/5 dark:hover:bg-surface-alt-ink transition-colors has-[:checked]:bg-olive/5 has-[:checked]:border-olive dark:has-[:checked]:bg-olive/10"
                  >
                    <input type="radio" name="payment" defaultChecked={pay.label === "Transfer BCA"} className="h-4 w-4 accent-brick" />
                    <div>
                      <span className="font-bold text-sm">{pay.label}</span>
                      <p className="text-xs text-ink-muted">{pay.detail}</p>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-5 space-y-4 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            >
              <h2 className="font-bold text-base">Ringkasan Pesanan</h2>
              <div className="space-y-2.5 text-sm">
                {items.length === 0 ? (
                  <p className="text-ink-muted text-xs">Tidak ada item di keranjang</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id + item.grind} className="flex justify-between">
                      <span className="text-ink-muted dark:text-ink-muted">{item.name} <span className="text-ink-muted">x{item.quantity}</span></span>
                      <span className="font-bold">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                    </div>
                  ))
                )}
              </div>
                <hr className="border-t border-brick/10 dark:border-ink/20" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-muted">Subtotal</span><span className="font-bold">Rp{subtotal.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Ongkos Kirim</span><span className="font-bold">Rp{subtotal > 100000 ? 0 : 12000}</span></div>
              <hr className="border-t border-brick/10 dark:border-ink/20" />
                <div className="flex justify-between text-lg"><span className="font-bold">Total</span><span className="font-black text-brick">Rp{(subtotal + (subtotal > 100000 ? 0 : 12000)).toLocaleString("id-ID")}</span></div>
              </div>
              <Button size="lg" className="w-full text-sm gap-2" onClick={async () => {
                setLoading(true)
                await new Promise((r) => setTimeout(r, 1500))
                clearCart()
                toast("Pesanan berhasil dibuat! Konfirmasi dikirim via email.", "success")
                setLoading(false)
                setSubmitted(true)
              }} disabled={items.length === 0 || loading}>
                {loading ? <><Loader2 size={18} className="animate-spin" /> Memproses...</> : "Konfirmasi Pesanan"}
              </Button>
              <Link href="/keranjang" className="block text-center text-xs text-ink-muted hover:text-brick font-medium">
                <ArrowLeft size={12} className="inline mr-1" />
                Kembali ke Keranjang
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
