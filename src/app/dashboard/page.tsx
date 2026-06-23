"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { dashboardStats, recentOrders, products } from "@/lib/coffee-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SITE_CONFIG } from "@/config"
import { LayoutDashboard, Package, Users, TrendingUp, Download, Plus, MoreHorizontal, Lock, LogIn, ArrowUpRight, ArrowDownRight, ShoppingCart, Settings } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const statIcons = [ShoppingCart, TrendingUp, Package, Users]

function statusDot(status: string) {
  const colors: Record<string, string> = {
    Selesai: "bg-emerald-500",
    Dikirim: "bg-sky-500",
    Diproses: "bg-amber-500",
    Dibatalkan: "bg-red-500",
  }
  return <span className={`dashboard-status-dot ${colors[status] || "bg-ink-muted"}`} />
}

function statusLabel(s: string, t: (k: string) => string) {
  const labels: Record<string, string> = {
    Selesai: t("dashboard.status_selesai"),
    Dikirim: t("dashboard.status_dikirim"),
    Diproses: t("dashboard.status_diproses"),
    Dibatalkan: t("dashboard.status_dibatalkan"),
  }
  return labels[s] || s
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)
  const { t } = useI18n()
  const reduce = useReducedMotion()

  function handleAuth() {
    if (pass === SITE_CONFIG.dashboard.accessCode) {
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-sm text-center space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brick/10 dark:bg-plum text-white mx-auto"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock size={22} />
          </motion.div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black tracking-tight">{t("dashboard.akses_ditolak")}</h1>
            <p className="text-sm text-ink-muted">{t("dashboard.masukkan_kode")}</p>
          </div>
          <div className="space-y-3 max-w-xs mx-auto">
            <Input
              type="password"
              placeholder={t("dashboard.masukkan_kode")}
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false) }}
              onKeyDown={(e) => { if (e.key === "Enter") handleAuth() }}
              className="text-center text-sm h-11"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 font-medium"
              >
                {t("dashboard.kode_salah")}
              </motion.p>
            )}
          </div>
          <Button onClick={handleAuth} className="gap-2 mx-auto">
            <LogIn size={16} /> {t("auth.masuk_btn")}
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-plum to-plum-medium text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] shrink-0">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t("dashboard.title")}</h1>
            <p className="text-xs text-ink-muted">{t("dashboard.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-xl">
            <Download size={14} /> {t("dashboard.laporan")}
          </Button>
          <Button size="sm" className="gap-1.5 text-xs rounded-xl bg-gradient-to-b from-plum to-plum-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-plum-medium hover:to-plum border-0">
            <Plus size={14} /> {t("dashboard.produk_baru")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {dashboardStats.map((stat, i) => {
          const Icon = statIcons[i]
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 100, damping: 15 }}
              className="dashboard-card dashboard-card-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-brick/10 dark:bg-plum/30 flex items-center justify-center text-brick dark:text-[#D4D0DC]">
                    <Icon size={15} />
                  </div>
                  <span className="text-[13px] text-ink-muted font-medium">{stat.label}</span>
                </div>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
                  stat.isPositive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.change}
                </span>
              </div>
              <p className="dashboard-stat-value">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="xl:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
            className="dashboard-card"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold">{t("dashboard.pesanan_terbaru")}</h2>
              <Button variant="ghost" size="sm" className="text-xs rounded-xl gap-1">
                {t("blog.lihat_semua")}
                <ArrowUpRight size={12} />
              </Button>
            </div>
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink/10 dark:border-[#33313B] text-left">
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted">{t("dashboard.invoice")}</th>
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted">{t("dashboard.total_pelanggan")}</th>
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted hidden sm:table-cell">{t("hero.produk")}</th>
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted">{t("keranjang.total")}</th>
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted">{t("dashboard.status")}</th>
                    <th className="pb-3 font-semibold text-[11px] uppercase tracking-[0.08em] text-ink-muted hidden sm:table-cell">{t("dashboard.tanggal")}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-ink/5 dark:border-[#33313B]/30 hover:bg-ink/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-bold text-xs">{order.id}</td>
                      <td className="py-3 text-xs">{order.customer}</td>
                      <td className="py-3 text-xs hidden sm:table-cell text-ink-muted">{order.product}</td>
                      <td className="py-3 font-bold text-xs">Rp{order.amount.toLocaleString("id-ID")}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-lg bg-ink/5 dark:bg-white/5">
                          {statusDot(order.status)}
                          {statusLabel(order.status, t)}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-ink-muted hidden sm:table-cell">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 15 }}
            className="dashboard-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">{t("dashboard.total_produk")}</h2>
              <Button variant="ghost" size="sm" aria-label={t("aria.menu")} className="h-8 w-8 p-0">
                <MoreHorizontal size={15} />
              </Button>
            </div>
            <div className="space-y-1">
              {products.slice(0, 5).map((product, pi) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pi * 0.04 }}
                  className="flex items-center justify-between gap-3 px-2 py-2 rounded-xl hover:bg-ink/[0.03] dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 shrink-0 relative rounded-lg overflow-hidden bg-brick/10 dark:bg-surface-ink ring-1 ring-ink/10 dark:ring-white/10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{product.name}</p>
                      <p className="text-[11px] text-ink-muted">{product.weight}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold shrink-0 tabular-nums ${
                    product.stock < 30
                      ? "text-red-500"
                      : "text-ink-muted dark:text-[#D4D0DC]"
                  }`}>
                    {product.stock}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            className="dashboard-card"
          >
            <h2 className="text-sm font-bold mb-3">{t("dashboard.aktivitas_cepat")}</h2>
            <div className="space-y-1">
              {[
                { icon: Package, label: t("dashboard.tambah_produk") },
                { icon: Users, label: t("dashboard.atur_pelanggan") },
                { icon: TrendingUp, label: t("dashboard.lihat_analitik") },
                { icon: Settings, label: t("umum.pengaturan") },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink/[0.03] dark:hover:bg-white/[0.03] transition-all text-left group"
                >
                  <div className="h-8 w-8 rounded-lg bg-brick/10 dark:bg-plum/30 flex items-center justify-center text-brick dark:text-[#D4D0DC] group-hover:scale-105 transition-transform">
                    <item.icon size={15} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
