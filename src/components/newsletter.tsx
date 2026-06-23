"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { Mail, Loader2 } from "lucide-react"

export function Newsletter() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast(t("umum.email_tidak_valid"), "error")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast(t("umum.berhasil_berlangganan"), "success")
    setEmail("")
    setLoading(false)
  }

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
          <form onSubmit={handleSubmit} className="relative z-10 text-center space-y-5">
            <motion.div
              className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-brick text-ink border-2 border-ink card-shadow-hard mx-auto"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={24} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black text-paper">
              {t("newsletter.heading")}
            </h2>
            <p className="text-sm text-paper/70 leading-relaxed max-w-sm mx-auto">
              {t("newsletter.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter_placeholder")}
                aria-label={t("footer.newsletter_placeholder")}
                className="flex-1 h-12 text-sm"
              />
              <Button type="submit" disabled={loading} className="whitespace-nowrap font-bold text-sm h-12 shrink-0 bg-brick text-ink hover:bg-brick-deep disabled:opacity-50">
                {loading ? <Loader2 size={16} className="animate-spin" /> : t("footer.newsletter_btn")}
              </Button>
            </div>
            <p className="text-[11px] text-paper/50 font-medium">{t("newsletter.berhenti")}</p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
