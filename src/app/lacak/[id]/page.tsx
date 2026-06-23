"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { motion, useReducedMotion } from "motion/react"
import { useOrder } from "@/lib/order-context"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"
import { Package, ArrowLeft, Clock, MapPin, CreditCard, CheckCircle2, Truck, PackageCheck, ShoppingBag } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"

const steps = [
  { key: "Diproses", label: "Dikemas", icon: Package },
  { key: "Dikirim", label: "Dikirim", icon: Truck },
  { key: "Selesai", label: "Terkirim", icon: PackageCheck },
]

export default function LacakPage() {
  usePageTitle("Lacak Pesanan — KOPI Nusantara")
  const params = useParams()
  const { getOrder } = useOrder()
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const order = getOrder(params.id as string)

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
        <EmptyState icon={<Package size={40} />} title="Pesanan tidak ditemukan" description="Periksa kembali nomor pesanan Anda" action={<Link href="/katalog"><Button className="gap-2"><ShoppingBag size={16} />{t("keranjang.lanjut_belanja")}</Button></Link>} />
      </div>
    )
  }

  const currentStep = steps.findIndex((s) => s.key === order.status)
  const isCancelled = order.status === "Dibatalkan"

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link href="/profil" className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink mb-6 transition-colors">
          <ArrowLeft size={16} /> {t("umum.kembali_ke")} {t("nav.pesanan")}
        </Link>

        <div className="bg-card rounded-[16px] border-2 border-ink card-shadow-hard overflow-hidden">
          <div className="p-5 sm:p-6 border-b-2 border-ink">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-2xl font-black tracking-tight text-ink">{order.id}</h1>
              <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white ${order.status === "Selesai" ? "bg-emerald-500" : order.status === "Dikirim" ? "bg-sky-500" : order.status === "Diproses" ? "bg-amber-500" : "bg-red-500"}`}>
                {t(`dashboard.status_${order.status === "Selesai" ? "selesai" : order.status === "Dikirim" ? "dikirim" : order.status === "Diproses" ? "diproses" : "dibatalkan"}`)}
              </span>
            </div>
            <p className="text-sm text-ink-muted">{order.date}</p>
          </div>

          {!isCancelled && (
            <div className="px-5 sm:px-6 py-6">
              <div className="flex items-center justify-between max-w-lg mx-auto">
                {steps.map((step, i) => {
                  const isActive = i <= currentStep
                  const isCurrent = i === currentStep
                  const Icon = step.icon
                  return (
                    <div key={step.key} className="flex flex-col items-center relative">
                      <div className={`h-10 w-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${isActive ? "bg-brick text-white border-brick" : "bg-card text-ink-muted border-ink/20"}`}>
                        {isActive && i < currentStep ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                      </div>
                      <p className={`text-[10px] font-bold mt-1.5 ${isActive ? "text-ink" : "text-ink-muted"}`}>{step.label}</p>
                      {isCurrent && <span className="text-[10px] text-brick font-bold animate-pulse">Sekarang</span>}
                      {i < steps.length - 1 && (
                        <div className={`absolute top-5 left-10 w-[calc(100%+40px)] h-0.5 -z-10 ${i < currentStep ? "bg-brick" : "bg-ink/10"}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-paper-alt rounded-xl p-3 border border-ink/10">
                <div className="h-12 w-12 rounded-lg bg-cover bg-center border border-ink/20 shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.productName}</p>
                  <p className="text-xs text-ink-muted">{item.quantity}x Rp{item.price.toLocaleString("id-ID")}</p>
                </div>
                <p className="text-sm font-black shrink-0">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</p>
              </div>
            ))}

            <div className="bg-paper-alt rounded-xl p-4 border border-ink/10 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-ink-muted">
                <MapPin size={14} /> <span className="font-medium">{order.address}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <CreditCard size={14} /> <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <Clock size={14} /> <span className="font-medium">Estimasi: {order.estimasi}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex items-center gap-2 text-ink-muted">
                  <Truck size={14} /> <span className="font-medium">Resi: {order.trackingNumber}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-ink/10">
              <span className="text-sm font-bold">{t("keranjang.total")}</span>
              <span className="text-lg font-black text-brick">Rp{order.total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Link href="/profil" className="flex-1"><Button variant="outline" className="w-full">{t("umum.kembali_ke")} {t("nav.pesanan")}</Button></Link>
          <Link href="/katalog" className="flex-1"><Button className="w-full">{t("keranjang.lanjut_belanja")}</Button></Link>
        </div>
      </motion.div>
    </div>
  )
}
