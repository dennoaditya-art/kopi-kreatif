"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { dashboardStats, recentOrders, products } from "@/lib/coffee-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, Users, TrendingUp, Download, Plus, MoreHorizontal, Lock, LogIn } from "lucide-react"

const statusColors: Record<string, "success" | "default" | "brick" | "destructive"> = {
  Selesai: "success",
  Dikirim: "default",
  Diproses: "brick",
  Dibatalkan: "destructive",
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)
  const reduce = useReducedMotion()

  function handleAuth() {
    if (pass === process.env.NEXT_PUBLIC_DASHBOARD_PASS) {
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  if (!authed) {
    return (
      <div>
        <motion.div
          className="mx-auto max-w-sm px-4 py-20 text-center space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brick/10 dark:bg-surface-ink text-ink-muted"
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock size={24} />
          </motion.div>
          <h1 className="tracking-display text-2xl font-black">Akses Dashboard</h1>
          <p className="text-sm text-ink-muted">Masukkan kode akses untuk melanjutkan</p>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Kode akses"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false) }}
              onKeyDown={(e) => { if (e.key === "Enter") handleAuth() }}
              className="text-center text-sm h-11"
            />
            {error && <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-red-500 font-medium"
            >Kode akses salah</motion.p>}
          </div>
          <Button onClick={handleAuth} className="gap-2">
            <LogIn size={16} /> Masuk
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brick text-white flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <h1 className="tracking-display text-2xl sm:text-3xl font-black">Dashboard</h1>
              <p className="text-xs text-ink-muted font-medium">Kelola toko kopi kamu</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download size={14} /> Laporan
            </Button>
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus size={14} /> Produk Baru
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {dashboardStats.map((stat, i) => {
            const statIcons = [Package, TrendingUp, Package, Users]
            const Icon = statIcons[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-4 card-shadow-hard hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-brick/10 flex items-center justify-center text-brick">
                      <Icon size={14} />
                    </div>
                    <p className="text-xs text-ink-muted font-medium">{stat.label}</p>
                  </div>
                  <span className={`text-[11px] font-bold ${stat.isPositive ? "text-brick" : "text-red-500"}`}>{stat.change}</span>
                </div>
                <p className="text-xl sm:text-2xl font-black mt-2 tracking-tight">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-5 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm">Pesanan Terbaru</h2>
                <Button variant="ghost" size="sm" className="text-xs">Lihat Semua</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brick/10 dark:border-ink/20 text-left">
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted">Invoice</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted">Pelanggan</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted hidden sm:table-cell">Produk</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted">Total</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted">Status</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-ink-muted hidden sm:table-cell">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-ink/5 dark:border-ink/20">
                        <td className="py-2.5 font-bold text-xs">{order.id}</td>
                        <td className="py-2.5 text-xs">{order.customer}</td>
                        <td className="py-2.5 text-xs hidden sm:table-cell">{order.product}</td>
                        <td className="py-2.5 font-bold text-xs">Rp{order.amount.toLocaleString("id-ID")}</td>
                        <td className="py-2.5">
                          <Badge variant={statusColors[order.status] || "default"} className="text-[10px]">{order.status}</Badge>
                        </td>
                        <td className="py-2.5 text-xs text-ink-muted hidden sm:table-cell">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-brick/10 dark:border-ink/20 p-5 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-sm">Stok Produk</h2>
                <Button variant="ghost" size="sm" aria-label="Menu"><MoreHorizontal size={16} /></Button>
              </div>
              <div className="space-y-2.5">
                {products.slice(0, 5).map((product, pi) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.05 }}
                    className="flex items-center justify-between gap-2 hover:bg-brick/5 dark:hover:bg-surface-alt-ink rounded-xl px-1.5 py-1 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-7 w-7 shrink-0 relative rounded-lg overflow-hidden bg-brick/10 dark:bg-surface-ink">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{product.name}</p>
                        <p className="text-[11px] text-ink-muted">{product.weight}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${product.stock < 30 ? "text-red-500" : "text-brick"}`}>{product.stock}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-surface-alt-ink rounded-2xl border border-olive/15 dark:border-ink/20 p-5 card-shadow-hard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, type: "spring", stiffness: 100, damping: 15 }}
            >
                <h2 className="font-bold text-sm mb-3">Aktivitas Cepat</h2>
              <div className="space-y-1.5">
                {[
                  { icon: Package, label: "Tambah Produk" },
                  { icon: Users, label: "Atur Pelanggan" },
                  { icon: TrendingUp, label: "Lihat Analitik" },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ x: 3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-ink/10 dark:border-ink/20 hover:bg-brick/5 dark:hover:from-zinc-800 dark:hover:to-transparent transition-all text-left"
                  >
                    <item.icon size={15} className="text-brick shrink-0" />
                    <span className="text-xs font-bold">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

