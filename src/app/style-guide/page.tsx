"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Coffee, Star, ShoppingCart, Heart, Search, ExternalLink } from "lucide-react"

const COLORS = [
  { name: "paper", hex: "#F8F6F0", dark: "#12100E", token: "bg-paper" },
  { name: "card", hex: "#FFFFFF", dark: "#1F1B17", token: "bg-card" },
  { name: "paper-alt", hex: "#F0EDE4", dark: "#1A1612", token: "bg-paper-alt" },
  { name: "ink", hex: "#1C1814", dark: "#EDE0D8", token: "bg-ink" },
  { name: "ink-muted", hex: "#6B5E4F", dark: "#9C9082", token: "bg-ink-muted" },
  { name: "brick", hex: "#B85C3C", dark: "#B85C3C", token: "bg-brick" },
  { name: "brick-deep", hex: "#9A4A30", dark: "#7A3820", token: "bg-brick-deep" },
  { name: "olive", hex: "#7A8B5E", dark: "#5D6E42", token: "bg-olive" },
]

const TYPE_SCALE = [
  { name: "Hero", class: "text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-[-0.04em]", text: "Kopi Nusantara" },
  { name: "Display", class: "text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em]", text: "Pilihan Terbaik" },
  { name: "Heading Lg", class: "text-[28px] font-bold leading-[1.1] tracking-[-0.02em]", text: "Koleksi Spesial Bulan Ini" },
  { name: "Heading", class: "text-[22px] font-bold leading-[1.2]", text: "Metode Pengiriman" },
  { name: "Body Lg", class: "text-[16px] leading-[1.5]", text: "Bubuk kopi premium dari petani lokal Indonesia." },
  { name: "Body", class: "text-[14px] leading-[1.5]", text: "Dipanggang segar setiap minggu." },
  { name: "Caption", class: "text-[12px] font-bold leading-[1.3]", text: "Best Seller" },
  { name: "Micro", class: "text-[10px] font-bold leading-[1.2] tracking-[0.08em]", text: "FRESH ROASTED" },
]

const NAV_SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "inputs", label: "Inputs" },
  { id: "shadows", label: "Shadows" },
  { id: "cards", label: "Cards" },
]

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState("colors")

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-[12px] bg-brick border-2 border-ink card-shadow-hard flex items-center justify-center">
            <Coffee size={18} className="text-ink" />
          </div>
          <div>
            <h1 className="font-black text-2xl text-ink">Style Guide</h1>
            <p className="text-sm text-ink-muted">Kopi Nusantara — Design System Reference</p>
          </div>
        </div>

        <div className="flex gap-8">
          <nav className="hidden lg:flex flex-col gap-1 w-48 shrink-0 sticky top-24 self-start">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeSection === s.id
                    ? "bg-brick text-ink border-2 border-ink"
                    : "text-ink-muted hover:text-ink hover:bg-ink/5"
                }`}
              >
                {s.label}
              </button>
            ))}
            <div className="border-t border-ink/10 my-4 pt-4 space-y-1">
              <a href="/katalog" className="block px-3 py-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
                ← Kembali
              </a>
            </div>
          </nav>

          <div className="flex-1 min-w-0 space-y-16">
            {/* Colors */}
            <section id="colors">
              <h2 className="font-black text-2xl text-ink mb-2">Colors</h2>
              <p className="text-sm text-ink-muted mb-6">Palette &quot;Olive + Brick + Paper&quot; — neobrutalist coffee e-commerce.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {COLORS.map((c) => (
                  <motion.div
                    key={c.name}
                    className="rounded-[16px] border-2 border-ink bg-card card-shadow-hard overflow-hidden"
                    whileHover={{ y: -2 }}
                  >
                    <div className="h-20 sm:h-24 flex items-end p-3" style={{ background: c.hex }}>
                      <span className="text-[10px] font-bold text-ink bg-white/80 px-1.5 py-0.5 rounded border border-ink">{c.token}</span>
                    </div>
                    <div className="p-3 space-y-0.5">
                      <p className="font-bold text-sm text-ink">{c.name}</p>
                      <p className="text-[11px] text-ink-muted font-mono">{c.hex} / {c.dark}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section id="typography">
              <h2 className="font-black text-2xl text-ink mb-2">Typography</h2>
              <p className="text-sm text-ink-muted mb-6">Geist (sans) + Geist Mono (mono) — 8-level type scale.</p>
              <div className="space-y-4">
                {TYPE_SCALE.map((t) => (
                  <div key={t.name} className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-[11px] font-bold text-ink-muted font-mono">{t.name}</span>
                      <span className="text-[10px] text-ink-muted font-mono">{t.class}</span>
                    </div>
                    <p className={t.class + " text-ink"}>{t.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <section id="buttons">
              <h2 className="font-black text-2xl text-ink mb-2">Buttons</h2>
              <p className="text-sm text-ink-muted mb-6">5 variants × 4 sizes + icon. Border 2px, hard shadow, hover lift.</p>
              <div className="space-y-8">
                {[
                  { label: "Default", variant: "default" as const },
                  { label: "Brick", variant: "brick" as const },
                  { label: "Olive", variant: "olive" as const },
                  { label: "Outline", variant: "outline" as const },
                  { label: "Ghost", variant: "ghost" as const },
                  { label: "Danger", variant: "danger" as const },
                ].map((v) => (
                  <div key={v.label}>
                    <p className="text-xs font-bold text-ink-muted font-mono mb-3">{v.label}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant={v.variant} size="sm">Small</Button>
                      <Button variant={v.variant} size="md">Medium</Button>
                      <Button variant={v.variant} size="lg">Large</Button>
                      <Button variant={v.variant} size="icon"><Heart size={16} /></Button>
                      <Button variant={v.variant} size="md" disabled>Disabled</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges */}
            <section id="badges">
              <h2 className="font-black text-2xl text-ink mb-2">Badges</h2>
              <p className="text-sm text-ink-muted mb-6">6 variants. Rounded-full, uppercase tracking-widest, font-mono 10px.</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Best Seller", variant: "default" as const },
                  { label: "Promo", variant: "brick" as const },
                  { label: "Organic", variant: "olive" as const },
                  { label: "Info", variant: "outline" as const },
                  { label: "Danger", variant: "destructive" as const },
                  { label: "Success", variant: "success" as const },
                ].map((b) => (
                  <Badge key={b.label} variant={b.variant}>{b.label}</Badge>
                ))}
              </div>
            </section>

            {/* Inputs */}
            <section id="inputs">
              <h2 className="font-black text-2xl text-ink mb-2">Inputs</h2>
              <p className="text-sm text-ink-muted mb-6">Height 44px, rounded-xl, border 2px ink. Focus ring brick.</p>
              <div className="space-y-4 max-w-md">
                <div>
                  <p className="text-[11px] font-bold text-ink-muted font-mono mb-2">Default</p>
                  <Input placeholder="Cari kopi..." />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-ink-muted font-mono mb-2">With icon</p>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                    <Input placeholder="Cari kopi..." className="pl-9" />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-ink-muted font-mono mb-2">Focus</p>
                  <Input placeholder="Ketik di sini..." className="focus-visible:ring-2 focus-visible:ring-brick" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-ink-muted font-mono mb-2">Disabled</p>
                  <Input placeholder="Disabled..." disabled />
                </div>
              </div>
            </section>

            {/* Shadows */}
            <section id="shadows">
              <h2 className="font-black text-2xl text-ink mb-2">Shadows</h2>
              <p className="text-sm text-ink-muted mb-6">Hard offset — no blur. Signature neobrutalist shadow system.</p>
              <div className="flex flex-wrap gap-6">
                <div className="w-40 h-32 rounded-[16px] border-2 border-ink bg-card card-shadow-hard flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-ink-muted font-mono">card-shadow-hard</p>
                    <p className="text-[9px] text-ink-muted font-mono">4px 4px 0px 0px</p>
                  </div>
                </div>
                <div className="w-40 h-32 rounded-[16px] border-2 border-ink bg-card card-shadow-hard-hover flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-ink-muted font-mono">card-shadow-hard-hover</p>
                    <p className="text-[9px] text-ink-muted font-mono">6px 6px 0px 0px</p>
                  </div>
                </div>
                <div className="w-40 h-32 rounded-[16px] border-2 border-ink bg-card flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-ink-muted font-mono">No shadow</p>
                    <p className="text-[9px] text-ink-muted font-mono">flat (default)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cards */}
            <section id="cards">
              <h2 className="font-black text-2xl text-ink mb-2">Cards</h2>
              <p className="text-sm text-ink-muted mb-6">Rounded-2xl (16px), border-2 ink, hard shadow, bg-card.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard space-y-2"
                  whileHover={{ y: -3 }}
                >
                  <Coffee size={20} className="text-brick" />
                  <h3 className="font-bold text-sm text-ink">Product Card</h3>
                  <p className="text-xs text-ink-muted">Standard product card with hard shadow and border.</p>
                  <Badge variant="default">Best Seller</Badge>
                </motion.div>
                <motion.div
                  className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard space-y-2"
                  whileHover={{ y: -3 }}
                >
                  <ShoppingCart size={20} className="text-olive" />
                  <h3 className="font-bold text-sm text-ink">Cart Item</h3>
                  <p className="text-xs text-ink-muted">Cart line item with quantity controls.</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">-</Button>
                    <span className="font-bold text-sm text-ink">1</span>
                    <Button size="sm" variant="outline">+</Button>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-card rounded-[16px] border-2 border-ink p-5 card-shadow-hard space-y-2"
                  whileHover={{ y: -3 }}
                >
                  <Star size={20} className="text-brick" />
                  <h3 className="font-bold text-sm text-ink">Testimonial</h3>
                  <p className="text-xs text-ink-muted italic">&ldquo;Kopinya enak banget!&rdquo;</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-ink/10">
                    <div className="h-7 w-7 rounded-full bg-brick text-ink flex items-center justify-center font-bold text-xs">A</div>
                    <p className="text-xs font-bold text-ink">Alex</p>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <motion.a
        href="https://lynk.id/kopi-kreatif"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 bg-brick text-ink px-4 py-2.5 rounded-[16px] border-2 border-ink card-shadow-hard text-xs font-bold hover:card-shadow-hard-hover hover:-translate-y-0.5 transition-all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
        aria-label="Beli template Kopi Nusantara"
      >
        <Coffee size={14} />
        Beli Template
        <ExternalLink size={12} />
      </motion.a>
    </div>
  )
}
