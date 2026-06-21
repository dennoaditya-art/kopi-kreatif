"use client"

import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const reduce = useReducedMotion()

  return (
    <section className="py-16 sm:py-20 bg-paper relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-[24px] bg-ink p-8 sm:p-12 relative overflow-hidden border-2 border-ink card-shadow-hard"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
        >
          <div className="relative z-10 text-center space-y-5">
            <motion.div
              className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-brick text-ink border-2 border-ink card-shadow-hard mx-auto"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={24} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black text-paper">
              Dapatkan Update Kopi
            </h2>
            <p className="text-sm text-paper/70 leading-relaxed max-w-sm mx-auto">
              Varian baru, promo spesial, dan tips brewing langsung ke email kamu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Masukkan email kamu"
                className="flex-1 h-12 text-sm"
              />
              <Button className="whitespace-nowrap font-bold text-sm h-12 shrink-0 bg-brick text-ink hover:bg-brick-deep">
                Berlangganan
              </Button>
            </div>
            <p className="text-[11px] text-paper/50 font-medium">Free unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
