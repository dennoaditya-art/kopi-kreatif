"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coffee, Eye, EyeOff, UserPlus, ArrowLeft, Loader2, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function DaftarPage() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) { setError(`${t("auth.nama")} ${t("kontak.harus_diisi")}`); return }
    if (!form.email.trim()) { setError(`${t("auth.email")} ${t("kontak.harus_diisi")}`); return }
    if (form.password.length < 6) { setError(t("auth.password_minimal")); return }
    if (form.password !== form.confirm) { setError(t("auth.password_tidak_cocok")); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="card-shadow-hard rounded-[2rem] border-2 border-ink bg-white p-10 dark:bg-surface-alt-ink">
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brick text-white card-shadow-hard"
              animate={reduce ? undefined : { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Check size={32} />
            </motion.div>
            <h1 className="text-2xl font-black text-ink dark:text-white">{t("auth.pendaftaran_berhasil")}</h1>
            <p className="mt-2 text-sm text-ink-muted dark:text-ink-muted">
              {t("auth.akun_berhasil")}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/masuk">
                <Button className="w-full border-2 border-ink text-base card-shadow-hard hover:card-shadow-hard-hover">
                  {t("auth.masuk_sekarang")}
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full text-sm">
                  {t("nav.beranda")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 pt-24 pb-16">
      <motion.div
        className="w-full max-w-md"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition-colors hover:text-ink dark:text-ink-muted dark:hover:text-white"
        >
          <ArrowLeft size={14} />
          {t("nav.beranda")}
        </Link>

        <div className="card-shadow-hard rounded-[2rem] border-2 border-ink bg-white p-8 dark:bg-surface-alt-ink sm:p-10">
          <div className="mb-8 text-center">
            <motion.div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brick text-ink card-shadow-hard"
              animate={reduce ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Coffee size={24} />
            </motion.div>
            <h1 className="text-2xl font-black text-ink dark:text-white">{t("auth.daftar_title")}</h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-ink-muted">{t("auth.gabung_desc")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-ink dark:text-white">{t("auth.nama")}</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t("auth.nama")}
                value={form.name}
                onChange={handleChange}
                className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                autoComplete="name"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-ink dark:text-white">{t("auth.email")}</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="kamu@email.com"
                value={form.email}
                onChange={handleChange}
                className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-ink dark:text-white">{t("auth.password")}</label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.password_placeholder")}
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 border-2 border-ink bg-white pr-11 text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink dark:hover:text-white"
                  aria-label={showPassword ? t("aria.sembunyikan_password") : t("aria.tampilkan_password")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirm" className="text-xs font-bold text-ink dark:text-white">{t("auth.konfirmasi_password")}</label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder={t("auth.ulangi_password")}
                value={form.confirm}
                onChange={handleChange}
                className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                autoComplete="new-password"
              />
            </div>

            <label className="flex items-start gap-2 text-xs font-medium text-ink-muted dark:text-ink-muted">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-2 border-ink accent-brick" />
              {t("auth.setuju")}{" "}
              <button type="button" className="font-bold text-brick underline-offset-2 hover:underline" aria-label={t("auth.syarat")}>{t("auth.syarat")}</button>
              {" "}{t("auth.dan")}{" "}
              <button type="button" className="font-bold text-brick underline-offset-2 hover:underline" aria-label={t("auth.privasi")}>{t("auth.privasi")}</button>
            </label>

            {error && (
              <motion.p
                className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 dark:bg-red-950 dark:text-red-400"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full border-2 border-ink text-base card-shadow-hard hover:card-shadow-hard-hover"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              {loading ? t("checkout.memproses") : t("auth.daftar_btn")}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-muted dark:text-ink-muted">
            {t("auth.sudah_punya_akun")}{" "}
            <Link href="/masuk" className="font-bold text-brick underline-offset-2 hover:underline">
              {t("auth.masuk_sekarang")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

