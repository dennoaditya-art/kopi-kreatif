"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useOrder } from "@/lib/order-context"
import { useToast } from "@/components/ui/toast"
import { CreditCard, MapPin, ArrowLeft, Check, ChevronRight, ShoppingCart, Coffee, Loader2, User, Truck } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import { useI18n } from "@/lib/i18n/context"
import { usePageTitle } from "@/hooks/use-page-title"

export default function CheckoutPage() {
  usePageTitle("Checkout — KOPI Nusantara")
  const { items, subtotal, clearCart } = useCart()
  const { addOrder } = useOrder()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", postal: "", shipping: "Reguler", payment: "Transfer BCA" })
  const reduce = useReducedMotion()
  const { t } = useI18n()
  const { toast } = useToast()
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)

  const shippingCost = subtotal > 100000 ? 0 : form.shipping === "Same Day" ? 45000 : form.shipping === "Express" ? 25000 : 12000
  const total = subtotal + shippingCost

  const steps = [
    { num: 1, label: t("checkout.info_pengiriman"), icon: User },
    { num: 2, label: t("checkout.metode_pengiriman"), icon: Truck },
    { num: 3, label: t("checkout.pembayaran"), icon: CreditCard },
    { num: 4, label: "Konfirmasi", icon: Check },
  ]

  if (submitted) {
    return (
      <div>
        <motion.div
          className="mx-auto max-w-xl px-4 pt-24 sm:pt-28 pb-16 text-center space-y-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.div
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brick text-white border-2 border-ink card-shadow-hard"
            animate={reduce ? undefined : { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Check size={32} />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t("checkout.sukses_title")}</h1>
          <p className="text-sm text-ink-muted max-w-sm mx-auto">{t("checkout.sukses_desc")}</p>
          <motion.div
            className="bg-card rounded-2xl border-2 border-ink p-4 text-left text-sm space-y-1.5 max-w-xs mx-auto card-shadow-hard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p><span className="font-bold">{t("checkout.no_pesanan")}</span> {lastOrderId}</p>
            <p><span className="font-bold">{t("checkout.estimasi")}</span> {form.shipping === "Same Day" ? "6-8 jam" : form.shipping === "Express" ? "1-2 hari" : "3-5 hari"}</p>
            <p><span className="font-bold">{t("checkout.pembayaran")}:</span> {form.payment}</p>
          </motion.div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href={`/lacak/${lastOrderId}`}><Button variant="outline" className="gap-2"><Truck size={16} />Lacak Pesanan</Button></Link>
            <Link href="/katalog"><Button>{t("checkout.belanja_lagi")}</Button></Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0 && !submitted) {
    return (
      <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12">
          <EmptyState
            icon={<ShoppingCart size={32} />}
            title={t("checkout.kosong_title")}
            description={t("checkout.kosong_desc")}
            action={
              <Link href="/katalog">
                <Button className="gap-2 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover">
                  <Coffee size={16} />
                  {t("keranjang.lihat_katalog")}
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  const shipLabel = form.shipping === "Same Day" ? t("checkout.same_day") : form.shipping === "Express" ? t("checkout.express") : t("checkout.reguler")

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step Progress */}
        <motion.div
          className="flex items-center justify-center gap-0 mb-8"
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-0 bg-paper-alt rounded-2xl p-1.5 border-2 border-ink">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-0">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    step === s.num ? "bg-card text-ink card-shadow-hard border border-ink" :
                    step > s.num ? "text-olive cursor-pointer" : "text-ink-muted"
                  }`}
                >
                  <s.icon size={14} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <ChevronRight size={14} className="text-ink-muted/40 mx-0.5" />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-[16px] border-2 border-ink p-5 space-y-4 card-shadow-hard"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-7 w-7 rounded-xl bg-brick text-white flex items-center justify-center text-xs font-bold">1</div>
                    <h2 className="font-bold text-sm">{t("checkout.info_pengiriman")}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input aria-label={t("checkout.nama")} placeholder={t("checkout.nama")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="text-sm h-10 border-2 border-ink" />
                    <Input type="tel" aria-label={t("checkout.no_telepon")} placeholder={t("checkout.no_telepon")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="text-sm h-10 border-2 border-ink" />
                    <div className="sm:col-span-2">
                      <Input aria-label={t("checkout.alamat")} placeholder={t("checkout.alamat")} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="text-sm h-10 border-2 border-ink" />
                    </div>
                    <Input aria-label={t("checkout.kota")} placeholder={t("checkout.kota")} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="text-sm h-10 border-2 border-ink" />
                    <Input aria-label={t("checkout.kode_pos")} placeholder={t("checkout.kode_pos")} value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} className="text-sm h-10 border-2 border-ink" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => {
                      if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.postal.trim()) {
                        toast(t("umum.harap_isi_data_pengiriman"), "error")
                        return
                      }
                      if (!/^[0-9+\-\s]{8,}$/.test(form.phone.trim())) {
                        toast(t("umum.nomor_telepon_tidak_valid"), "error")
                        return
                      }
                      setStep(2)
                    }} className="gap-2">{t("umum.lanjut")} <ChevronRight size={16} /></Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-[16px] border-2 border-ink p-5 space-y-3 card-shadow-hard"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-7 w-7 rounded-xl bg-brick text-white flex items-center justify-center text-xs font-bold">2</div>
                    <h2 className="font-bold text-sm">{t("checkout.metode_pengiriman")}</h2>
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: "Reguler", label: t("checkout.reguler"), est: "3-5 hari", price: 12000 },
                      { key: "Express", label: t("checkout.express"), est: "1-2 hari", price: 25000 },
                      { key: "Same Day", label: t("checkout.same_day"), est: "6-8 jam", price: 45000 },
                    ].map((method) => (
                      <motion.label
                        key={method.key}
                        whileHover={{ x: 2 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          form.shipping === method.key ? "border-brick bg-brick/5" : "border-ink/20 hover:bg-brick/5"
                        }`}
                      >
                        <input type="radio" name="shipping" checked={form.shipping === method.key} onChange={() => setForm({ ...form, shipping: method.key })} className="h-4 w-4 accent-brick" />
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
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2"><ArrowLeft size={16} /> {t("umum.kembali_ke")}</Button>
                    <Button onClick={() => setStep(3)} className="gap-2">{t("umum.lanjut")} <ChevronRight size={16} /></Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-[16px] border-2 border-ink p-5 space-y-3 card-shadow-hard"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-7 w-7 rounded-xl bg-brick text-white flex items-center justify-center text-xs font-bold">3</div>
                    <h2 className="font-bold text-sm">{t("checkout.pembayaran")}</h2>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Transfer BCA", detail: "Virtual Account" },
                      { label: "Transfer Mandiri", detail: "Virtual Account" },
                      { label: "GoPay", detail: "E-Wallet" },
                      { label: "COD", detail: t("checkout.cod") },
                    ].map((pay) => (
                      <motion.label
                        key={pay.label}
                        whileHover={{ x: 2 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          form.payment === pay.label ? "border-olive bg-olive/5" : "border-ink/20 hover:bg-olive/5"
                        }`}
                      >
                        <input type="radio" name="payment" checked={form.payment === pay.label} onChange={() => setForm({ ...form, payment: pay.label })} className="h-4 w-4 accent-brick" />
                        <div>
                          <span className="font-bold text-sm">{pay.label}</span>
                          <p className="text-xs text-ink-muted">{pay.detail}</p>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep(2)} className="gap-2"><ArrowLeft size={16} /> {t("umum.kembali_ke")}</Button>
                    <Button onClick={() => setStep(4)} className="gap-2">{t("umum.lanjut")} <ChevronRight size={16} /></Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-[16px] border-2 border-ink p-5 space-y-4 card-shadow-hard"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-7 w-7 rounded-xl bg-brick text-white flex items-center justify-center text-xs font-bold">4</div>
                    <h2 className="font-bold text-sm">Konfirmasi Pesanan</h2>
                  </div>
                  <div className="bg-paper-alt rounded-xl p-4 space-y-2 text-sm border border-ink/10">
                    <div className="flex items-center gap-2"><User size={14} className="text-ink-muted" /><span className="font-medium">{form.name}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-ink-muted" /><span className="text-ink-muted">{form.address}, {form.city}, {form.postal}</span></div>
                    <div className="flex items-center gap-2"><Truck size={14} className="text-ink-muted" /><span className="font-medium">{shipLabel}</span></div>
                    <div className="flex items-center gap-2"><CreditCard size={14} className="text-ink-muted" /><span className="font-medium">{form.payment}</span></div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep(3)} className="gap-2"><ArrowLeft size={16} /> {t("umum.kembali_ke")}</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            <motion.div
              className="bg-card rounded-[16px] border-2 border-ink p-5 space-y-4 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            >
              <h2 className="font-bold text-base">{t("checkout.ringkasan")}</h2>
              <div className="space-y-2.5 text-sm">
                {items.map((item) => (
                  <div key={item.id + item.grind} className="flex justify-between">
                    <span className="text-ink-muted">{item.name} <span className="text-ink-muted">x{item.quantity}</span></span>
                    <span className="font-bold">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>
              <hr className="border-t border-ink/10" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-muted">{t("keranjang.subtotal")}</span><span className="font-bold">Rp{subtotal.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">{t("keranjang.ongkir")}</span><span className="font-bold">{shippingCost === 0 ? t("keranjang.gratis") : `Rp${shippingCost.toLocaleString("id-ID")}`}</span></div>
              </div>
              <hr className="border-t border-ink/10" />
              <div className="flex justify-between text-lg"><span className="font-bold">{t("keranjang.total")}</span><span className="font-black text-brick">Rp{total.toLocaleString("id-ID")}</span></div>
              <Button
                size="lg"
                className="w-full text-sm gap-2"
                onClick={async () => {
                  if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.postal.trim()) {
                    toast(t("umum.harap_isi_data_pengiriman"), "error")
                    return
                  }
                  const id = addOrder({
                    customer: form.name,
                    items: items.map((i) => ({ id: i.id, productName: i.name, quantity: i.quantity, price: i.price, image: i.image })),
                    total,
                    shipping: shippingCost,
                    status: "Diproses",
                    shippingMethod: form.shipping,
                    paymentMethod: form.payment,
                    address: `${form.address}, ${form.city}, ${form.postal}`,
                    estimasi: form.shipping === "Same Day" ? "6-8 jam" : form.shipping === "Express" ? "1-2 hari" : "3-5 hari",
                  })
                  setLastOrderId(id)
                  setLoading(true)
                  await new Promise((r) => setTimeout(r, 1500))
                  clearCart()
                  toast(t("checkout.sukses_desc"), "success")
                  setLoading(false)
                  setSubmitted(true)
                }}
                disabled={items.length === 0 || loading || step < 4}
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> {t("checkout.memproses")}</> : t("checkout.konfirmasi")}
              </Button>
              <Link href="/keranjang" className="block text-center text-xs text-ink-muted hover:text-brick font-medium">
                <ArrowLeft size={12} className="inline mr-1" />
                {t("checkout.kembali")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

