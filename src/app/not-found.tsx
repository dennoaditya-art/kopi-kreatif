"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Coffee, ArrowLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function NotFoundPage() {
  const reduce = useReducedMotion()
  const { t } = useI18n()

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <motion.div
        className="mx-auto max-w-md text-center space-y-6"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] border-2 border-ink bg-card card-shadow-hard"
          animate={reduce ? undefined : { rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Coffee size={32} className="text-ink" />
        </motion.div>

        <motion.h1
          className="text-7xl sm:text-8xl font-black tracking-tighter text-ink"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 150 }}
        >
          404
        </motion.h1>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-ink">{t("umum.halaman_tidak_ditemukan")}</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            {t("umum.tidak_ditemukan_desc")}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover">
              <ArrowLeft size={16} />
              {t("umum.kembali_ke_beranda")}
            </Button>
          </Link>
          <Link href="/katalog">
            <Button variant="outline">{t("umum.lihat_katalog")}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
