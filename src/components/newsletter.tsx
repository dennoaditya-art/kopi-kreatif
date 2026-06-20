"use client"

import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const reduce = useReducedMotion()

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-secondary/10 rounded-full animate-blob blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="rounded-[2rem] bg-gradient-to-br from-ink via-[#3A2A20] to-ink p-8 sm:p-12 relative overflow-hidden border-2 border-ink card-shadow-hard"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,64,0.08),transparent_60%)]" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-float-slow" />

          <div className="max-w-xl mx-auto text-center space-y-5 relative z-10">
            <motion.div
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-ink border-2 border-ink card-shadow-hard"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={24} />
            </motion.div>
            <h2 className="tracking-display text-3xl sm:text-4xl font-black text-white">
              Dapatkan Update Kopi
            </h2>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mx-auto">
              Varian baru, promo spesial, dan tips brewing langsung ke email kamu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Masukkan email kamu"
                className="flex-1 border-2 border-ink bg-white text-ink placeholder:text-zinc-400 text-sm h-12 focus:ring-primary shadow-none rounded-xl"
              />
              <Button className="whitespace-nowrap font-bold text-sm h-12 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover shrink-0">
                Berlangganan
              </Button>
            </div>
            <p className="text-[11px] text-white/50 font-medium">Free unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
