"use client"

import { motion, useReducedMotion } from "motion/react"
import { useI18n } from "@/lib/i18n/context"
import { ShoppingCart, Users, ArrowUpRight, DollarSign } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const monthlyData = [
  { month: "Jan", orders: 85, revenue: 4200000, visitors: 1200 },
  { month: "Feb", orders: 92, revenue: 5100000, visitors: 1350 },
  { month: "Mar", orders: 105, revenue: 5800000, visitors: 1500 },
  { month: "Apr", orders: 98, revenue: 5300000, visitors: 1420 },
  { month: "Mei", orders: 120, revenue: 6500000, visitors: 1680 },
  { month: "Jun", orders: 132, revenue: 7100000, visitors: 1850 },
]

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))
const maxOrders = Math.max(...monthlyData.map((d) => d.orders))
const maxVisitors = Math.max(...monthlyData.map((d) => d.visitors))

export default function AnalitikPage() {
  usePageTitle("Analitik — KOPI Nusantara")
  const { t } = useI18n()
  const reduce = useReducedMotion()

  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0)
  const totalOrders = monthlyData.reduce((s, d) => s + d.orders, 0)
  const avgVisitors = Math.round(monthlyData.reduce((s, d) => s + d.visitors, 0) / monthlyData.length)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Analitik</h1>
            <p className="text-sm text-ink-muted">Ringkasan performa toko kamu — Januari hingga Juni 2026</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">{t("umum.kembali_ke")} Dashboard</Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {[
            { icon: DollarSign, label: "Total Pendapatan", value: `Rp${totalRevenue.toLocaleString("id-ID")}`, change: "+18.3%", color: "text-emerald-600" },
            { icon: ShoppingCart, label: "Total Pesanan", value: totalOrders.toLocaleString("id-ID"), change: "+12.5%", color: "text-sky-600" },
            { icon: Users, label: "Rata-rata Pengunjung", value: avgVisitors.toLocaleString("id-ID"), change: "+8.2%", color: "text-violet-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="dashboard-card dashboard-card-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white ${i === 0 ? "from-emerald-500 to-emerald-600" : i === 1 ? "from-sky-500 to-sky-600" : "from-violet-500 to-violet-600"}`}>
                  <stat.icon size={15} />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-1.5 py-0.5 rounded-md">
                  <ArrowUpRight size={10} />{stat.change}
                </span>
              </div>
              <p className="text-[13px] text-ink-muted font-medium mb-0.5">{stat.label}</p>
              <p className="dashboard-stat-value">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="dashboard-card mb-6"
        >
          <h2 className="text-sm font-bold mb-5">Pendapatan Bulanan</h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-ink-muted">Rp{(d.revenue / 1000000).toFixed(1)}jt</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-brick to-brick/60"
                  style={{ minHeight: 8 }}
                />
                <span className="text-[11px] font-bold text-ink-muted mt-1">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orders & Visitors Chart */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-card"
          >
            <h2 className="text-sm font-bold mb-5">Pesanan Bulanan</h2>
            <div className="flex items-end gap-3 h-32">
              {monthlyData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.orders / maxOrders) * 100}%` }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-plum to-plum-medium"
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-[10px] font-bold text-ink-muted mt-1">{d.orders}</span>
                  <span className="text-[10px] text-ink-muted">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="dashboard-card"
          >
            <h2 className="text-sm font-bold mb-5">Pengunjung Bulanan</h2>
            <div className="flex items-end gap-3 h-32">
              {monthlyData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.visitors / maxVisitors) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-olive to-olive/60"
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-[10px] font-bold text-ink-muted mt-1">{d.visitors}</span>
                  <span className="text-[10px] text-ink-muted">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
