"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    setSent(true)
  }

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5EDE4] via-[#FDF6F0] to-[#F0EBE3] py-20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 sm:py-28">
        <div className="pointer-events-none absolute -right-20 top-10 h-60 w-60 animate-blob rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/[0.05]" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 animate-blob rounded-full bg-accent/10 blur-3xl dark:bg-accent/[0.05]" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="card-shadow-hard mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-white">
              <MessageSquare size={12} />
              Hubungi Kami
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">
              Ada yang bisa <span className="text-primary">kami bantu?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
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
                  className="card-shadow-hard flex items-start gap-4 rounded-2xl border-2 border-ink bg-white p-5 dark:bg-zinc-900"
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                    <info.icon size={18} className="text-ink" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500">{info.label}</p>
                    <p className="text-sm font-bold text-ink dark:text-white">{info.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="rounded-2xl border-2 border-ink bg-gradient-to-br from-ink to-[#3A2A20] p-6 text-white shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]"
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
                className="rounded-[2rem] border-2 border-ink bg-white p-8 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] dark:bg-zinc-900 sm:p-10"
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {sent ? (
                  <div className="py-10 text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                      animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Check size={28} />
                    </motion.div>
                    <h2 className="text-xl font-black text-ink dark:text-white">Pesan Terkirim!</h2>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
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
                            className="h-12 border-2 border-ink bg-white text-ink placeholder:text-zinc-400 focus:ring-primary dark:bg-zinc-900 dark:text-white"
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
                            className="h-12 border-2 border-ink bg-white text-ink placeholder:text-zinc-400 focus:ring-primary dark:bg-zinc-900 dark:text-white"
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
                          className="h-12 border-2 border-ink bg-white text-ink placeholder:text-zinc-400 focus:ring-primary dark:bg-zinc-900 dark:text-white"
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
                          className="w-full rounded-xl border-2 border-ink bg-white px-4 py-3 text-sm text-ink placeholder:text-zinc-400 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-zinc-900 dark:text-white"
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
                        className="h-12 w-full border-2 border-ink text-base shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]"
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
