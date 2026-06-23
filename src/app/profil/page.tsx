"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { useOrder } from "@/lib/order-context"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, ChevronRight, Package as PackageIcon, Clock, CreditCard, Package } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"

const statusColors: Record<string, string> = {
  Selesai: "bg-emerald-500",
  Dikirim: "bg-sky-500",
  Diproses: "bg-amber-500",
  Dibatalkan: "bg-red-500",
}

export default function ProfilPage() {
  usePageTitle("Profil — KOPI Nusantara")
  const { orders } = useOrder()
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<"profil" | "pesanan">("pesanan")
  const [profile, setProfile] = useState({ name: "Rina Wijaya", email: "rina@email.com", phone: "0812-3456-7890", address: "Jl. Merdeka No. 10, Jakarta" })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-plum to-plum-medium text-white flex items-center justify-center text-xl font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">{profile.name}</h1>
            <p className="text-sm text-ink-muted">{profile.email}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-8 bg-paper-alt rounded-2xl p-1 border-2 border-ink w-fit">
          <button onClick={() => setTab("pesanan")} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "pesanan" ? "bg-card text-ink card-shadow-hard border border-ink" : "text-ink-muted hover:text-ink"}`}>
            <PackageIcon size={16} className="inline mr-1.5" />{t("nav.pesanan")}
          </button>
          <button onClick={() => setTab("profil")} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === "profil" ? "bg-card text-ink card-shadow-hard border border-ink" : "text-ink-muted hover:text-ink"}`}>
            <User size={16} className="inline mr-1.5" />{t("umum.pengaturan")}
          </button>
        </div>

        {tab === "pesanan" && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <PackageIcon size={48} className="mx-auto text-ink-muted mb-4" />
                <p className="text-ink-muted font-medium">{t("dashboard.belum_ada")}</p>
              </div>
            ) : (
              orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-[16px] border-2 border-ink p-4 sm:p-5 card-shadow-hard"
                >
                  <Link href={`/lacak/${order.id}`} className="block">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-sm text-ink">{order.id}</p>
                        <p className="text-[11px] text-ink-muted">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${statusColors[order.status]} text-white`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {t(`dashboard.status_${order.status === "Selesai" ? "selesai" : order.status === "Dikirim" ? "dikirim" : order.status === "Diproses" ? "diproses" : "dibatalkan"}`)}
                        </span>
                        <ChevronRight size={16} className="text-ink-muted" />
                      </div>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 shrink-0 bg-paper-alt rounded-xl px-3 py-2 border border-ink/10">
                          <div className="h-10 w-10 rounded-lg bg-cover bg-center border border-ink/20" style={{ backgroundImage: `url(${item.image})` }} />
                          <div>
                            <p className="text-xs font-bold truncate max-w-[120px]">{item.productName}</p>
                            <p className="text-[10px] text-ink-muted">{item.quantity}x Rp{item.price.toLocaleString("id-ID")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-ink/10 text-xs text-ink-muted">
                      <span className="flex items-center gap-1"><CreditCard size={12} />{order.paymentMethod}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{order.estimasi}</span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        )}

        {tab === "profil" && (
          <div className="max-w-lg space-y-4">
            <div className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-muted">{t("checkout.nama")}</label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-muted">{t("checkout.email")}</label>
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-muted">{t("checkout.no_telepon")}</label>
                <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="h-11" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-muted">{t("checkout.alamat")}</label>
                <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="h-11" />
              </div>
              <Button className="w-full gap-2"><User size={16} />{t("umum.simpan")}</Button>
            </div>
            <div className="flex gap-2">
              <Link href="/katalog" className="flex-1"><Button variant="outline" className="w-full gap-2"><Package size={16} />{t("keranjang.lanjut_belanja")}</Button></Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
