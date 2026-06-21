"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, Loader2, Check } from "lucide-react"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  { icon: MapPin, label: "Alamat", value: "Jl. Kopi Nusantara No. 45, Yogyakarta, 55123" },
  { icon: Mail, label: "Email", value: "halo@kopi-nusantara.com" },
  { icon: Phone, label: "Telepon", value: "+62 812 3456 7890" },
  { icon: Clock, label: "Jam Operasional", value: "Sen–Sab, 08:00–17:00 WIB" },
]

export default function KontakPage() {
  const reduce = useReducedMotion()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) { setError("Nama harus diisi"); return }
    if (!form.email.trim()) { setError("Email harus diisi"); return }
    if (!form.subject.trim()) { setError("Subjek harus diisi"); return }
    if (!form.message.trim()) { setError("Pesan harus diisi"); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    toast("Pesan berhasil dikirim! Kami akan membalas dalam 1x24 jam.", "success")
    setSent(true)
  }

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-paper py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="card-shadow-hard mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-surface-ink dark:border-ink/20">
              <MessageSquare size={12} />
              Hubungi Kami
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">
              Ada yang bisa <span className="text-brick">kami bantu?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-muted dark:text-ink-muted">
              Tim kami siap mendengar pertanyaan, saran, atau sekadar ngobrol soal kopi.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">

            {/* Info cards */}
            <div className="space-y-4 lg:col-span-2">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className="card-shadow-hard flex items-start gap-4 rounded-2xl border-2 border-ink bg-white p-5 dark:bg-surface-alt-ink"
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brick card-shadow-hard">
                    <info.icon size={18} className="text-ink" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-muted">{info.label}</p>
                    <p className="text-sm font-bold text-ink dark:text-white">{info.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="card-shadow-hard rounded-2xl border-2 border-ink bg-ink p-6 text-white dark:bg-card dark:text-ink dark:border-ink/20"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-black">Ikuti Kami</h3>
                <p className="mt-1 text-xs text-white/60">Dapatkan update terbaru seputar kopi Nusantara.</p>
                <div className="mt-3 flex gap-2">
                  {["Instagram", "TikTok", "Facebook", "X"].map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-white/20 px-3 py-1.5 text-[11px] font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <motion.div
                className="rounded-[24px] border-2 border-ink bg-card p-8 card-shadow-hard sm:p-10"
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {sent ? (
                  <div className="py-10 text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brick text-white card-shadow-hard"
                      animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Check size={28} />
                    </motion.div>
                    <h2 className="text-xl font-black text-ink dark:text-white">Pesan Terkirim!</h2>
                    <p className="mt-2 text-sm text-ink-muted dark:text-ink-muted">
                      Terima kasih! Tim kami akan membalas pesan kamu dalam 1x24 jam.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 border-2 border-ink"
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                    >
                      Kirim Pesan Lagi
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 text-xl font-black text-ink dark:text-white">Kirim Pesan</h2>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-xs font-bold text-ink dark:text-white">Nama Lengkap</label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Nama kamu"
                            value={form.name}
                            onChange={handleChange}
                            className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-bold text-ink dark:text-white">Email</label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="kamu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="subject" className="text-xs font-bold text-ink dark:text-white">Subjek</label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Ada yang bisa kami bantu?"
                          value={form.subject}
                          onChange={handleChange}
                          className="h-12 border-2 border-ink bg-white text-ink placeholder:text-ink-muted focus:ring-brick dark:bg-surface-alt-ink dark:text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-bold text-ink dark:text-white">Pesan</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Tulis pesan kamu di sini..."
                          value={form.message}
                          onChange={handleChange}
                          className="w-full rounded-xl border-2 border-ink bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brick focus:outline-none dark:bg-surface-alt-ink dark:text-white"
                        />
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
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        {loading ? "Mengirim..." : "Kirim Pesan"}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

          </div>
        </div>
        </section>
    </div>
  )
}
