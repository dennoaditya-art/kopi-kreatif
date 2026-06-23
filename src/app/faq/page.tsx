"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useI18n } from "@/lib/i18n/context"
import { ChevronDown, HelpCircle, Mail, MessageCircle } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  { q: "kontak.faq_1_q", a: "kontak.faq_1_a" },
  { q: "kontak.faq_2_q", a: "kontak.faq_2_a" },
  { q: "kontak.faq_3_q", a: "kontak.faq_3_a" },
  { q: "kontak.faq_4_q", a: "kontak.faq_4_a" },
  { q: "kontak.faq_5_q", a: "kontak.faq_5_a" },
  { q: "kontak.faq_6_q", a: "kontak.faq_6_a" },
  { q: "kontak.faq_7_q", a: "kontak.faq_7_a" },
  { q: "kontak.faq_8_q", a: "kontak.faq_8_a" },
]

export default function FaqPage() {
  usePageTitle("FAQ — KOPI Nusantara")
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brick/10 text-brick mb-4">
            <HelpCircle size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink mb-2">{t("kontak.faq_title")}</h1>
          <p className="text-sm text-ink-muted max-w-md mx-auto">Pertanyaan yang sering ditanyakan sama para pecinta kopi.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-[16px] border-2 border-ink overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
              >
                <span className="font-bold text-sm sm:text-base text-ink flex-1">{faq.q.startsWith("kontak.") ? t(faq.q) : faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-ink-muted transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      <div className="h-px bg-ink/10 mb-3" />
                      <p className="text-sm text-ink-muted leading-relaxed">{faq.a.startsWith("kontak.") ? t(faq.a) : faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 bg-paper-alt rounded-[16px] border-2 border-ink p-6 sm:p-8 card-shadow-hard text-center">
          <h2 className="font-black text-lg mb-2 text-ink">Masih punya pertanyaan?</h2>
          <p className="text-sm text-ink-muted mb-5">Tim kami siap membantu kamu dalam 1-2 hari kerja.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kontak">
              <Button className="gap-2"><Mail size={16} />Hubungi Kami</Button>
            </Link>
            <Link href="/katalog">
              <Button variant="outline" className="gap-2"><MessageCircle size={16} />Jelajahi Kopi</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
