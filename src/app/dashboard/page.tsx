"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { dashboardStats, recentOrders, products } from "@/lib/coffee-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, Users, TrendingUp, Download, Plus, MoreHorizontal, Lock, LogIn } from "lucide-react"

const statusColors: Record<string, "success" | "default" | "secondary" | "destructive"> = {
  Selesai: "success",
  Dikirim: "default",
  Diproses: "secondary",
  Dibatalkan: "destructive",
}

const DASHBOARD_PASS = "admin123"

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)
  const reduce = useReducedMotion()

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
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-zinc-800 text-zinc-500"
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock size={24} />
          </motion.div>
          <h1 className="tracking-display text-2xl font-black">Akses Dashboard</h1>
          <p className="text-sm text-zinc-500">Masukkan kode akses untuk melanjutkan</p>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Kode akses"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false) }}
              onKeyDown={(e) => { if (e.key === "Enter" && pass === DASHBOARD_PASS) setAuthed(true); else if (e.key === "Enter") setError(true) }}
              className="text-center text-sm h-11"
            />
            {error && <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-red-500 font-medium"
            >Kode akses salah</motion.p>}
          </div>
          <Button onClick={() => { if (pass === DASHBOARD_PASS) setAuthed(true); else setError(true) }} className="gap-2">
            <LogIn size={16} /> Masuk
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <h1 className="tracking-display text-2xl sm:text-3xl font-black">Dashboard</h1>
              <p className="text-xs text-zinc-500 font-medium">Kelola toko kopi kamu</p>
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
                className={`bg-white dark:bg-zinc-900 rounded-2xl border border-primary/10 dark:border-zinc-800 p-4 card-shadow hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                      <Icon size={14} />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">{stat.label}</p>
                  </div>
                  <span className={`text-[11px] font-bold ${stat.isPositive ? "text-secondary" : "text-red-500"}`}>{stat.change}</span>
                </div>
                <p className="text-xl sm:text-2xl font-black mt-2 tracking-tight">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-primary/10 dark:border-zinc-800 p-5 card-shadow"
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
                    <tr className="border-b border-primary/10 dark:border-zinc-700 text-left">
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500">Invoice</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500">Pelanggan</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500 hidden sm:table-cell">Produk</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500">Total</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500">Status</th>
                      <th className="pb-2.5 font-bold text-[11px] uppercase tracking-[0.08em] text-zinc-500 hidden sm:table-cell">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-50 dark:border-zinc-800">
                        <td className="py-2.5 font-bold text-xs">{order.id}</td>
                        <td className="py-2.5 text-xs">{order.customer}</td>
                        <td className="py-2.5 text-xs hidden sm:table-cell">{order.product}</td>
                        <td className="py-2.5 font-bold text-xs">Rp{order.amount.toLocaleString("id-ID")}</td>
                        <td className="py-2.5">
                          <Badge variant={statusColors[order.status] || "default"} className="text-[10px]">{order.status}</Badge>
                        </td>
                        <td className="py-2.5 text-xs text-zinc-500 hidden sm:table-cell">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-primary/10 dark:border-zinc-800 p-5 card-shadow"
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
                    className="flex items-center justify-between gap-2 hover:bg-primary/5 dark:hover:bg-zinc-800 rounded-xl px-1.5 py-1 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-7 w-7 shrink-0 relative rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 dark:bg-zinc-800">
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
                        <p className="text-[11px] text-zinc-500">{product.weight}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${product.stock < 30 ? "text-red-500" : "text-secondary"}`}>{product.stock}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-accent/15 dark:border-zinc-800 p-5 card-shadow"
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
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 dark:hover:from-zinc-800 dark:hover:to-transparent transition-all text-left"
                  >
                    <item.icon size={15} className="text-primary shrink-0" />
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
