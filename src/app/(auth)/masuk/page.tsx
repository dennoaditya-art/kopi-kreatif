"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Coffee, Eye, EyeOff, LogIn, ArrowLeft, Loader2 } from "lucide-react"
import { usePageTitle } from "@/hooks/use-page-title"
import { useI18n } from "@/lib/i18n/context"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/toast"

export default function MasukPage() {
  const { t } = useI18n()
  usePageTitle(`${t("auth.masuk_title")} — KOPI Nusantara`)
  const { login } = useAuth()
  const router = useRouter()
  const reduce = useReducedMotion()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ email: "", password: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.email.trim()) { setError(`${t("auth.email")} ${t("kontak.harus_diisi")}`); return }
    if (!form.password.trim()) { setError(`${t("auth.password")} ${t("kontak.harus_diisi")}`); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.ok) {
      toast(t("umum.berhasil_masuk"), "success")
      router.push("/")
    } else {
      setError(result.error || "")
    }
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
            <h1 className="text-2xl font-black text-ink dark:text-white">{t("auth.selamat_datang")}</h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-ink-muted">{t("auth.masuk_title")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder={t("auth.password")}
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 border-2 border-ink bg-white pr-11 text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-medium text-ink-muted dark:text-ink-muted">
                <input type="checkbox" className="h-4 w-4 rounded border-2 border-ink accent-brick" />
                {t("auth.ingat_saya")}
              </label>
              <button type="button" className="text-xs font-bold text-brick underline-offset-2 hover:underline">
                {t("auth.lupa_password")}
              </button>
            </div>

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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              {loading ? t("checkout.memproses") : t("auth.masuk_btn")}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-muted dark:text-ink-muted">
            {t("auth.belum_punya_akun")}{" "}
            <Link href="/daftar" className="font-bold text-brick underline-offset-2 hover:underline">
              {t("auth.daftar_sekarang")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

