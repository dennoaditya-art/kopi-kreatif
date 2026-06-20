"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Coffee, Sprout, Heart, Award, Users, ArrowRight } from "lucide-react"

const values = [
  { icon: Sprout, title: "Petani Dulu", desc: "Kami bermitra langsung dengan petani kopi lokal dengan harga yang adil dan berkelanjutan." },
  { icon: Heart, title: "Cinta Produk Lokal", desc: "Setiap biji adalah kekayaan Nusantara yang kami banggakan ke seluruh dunia." },
  { icon: Award, title: "Kualitas Terjaga", desc: "Roasting small-batch mingguan memastikan setiap pengiriman dalam kondisi puncak kesegaran." },
  { icon: Users, title: "Komunitas", desc: "Lebih dari sekadar jual kopi — kami membangun ekosistem pecinta kopi Nusantara." },
]

const timeline = [
  { year: "2018", title: "Bermula dari Cinta Kopi", desc: "Didirikan oleh dua sahabat yang jatuh cinta pada kopi Gayo saat traveling ke Aceh." },
  { year: "2019", title: "Roasting Pertama", desc: "Memulai roasting di dapur kecil di Yogyakarta dengan kapasitas 5kg per batch." },
  { year: "2021", title: "Mitra Petani", desc: "Menjalin kerja sama langsung dengan 50+ petani kopi di 5 daerah penghasil utama." },
  { year: "2023", title: "Skala Nasional", desc: "Menjangkau 20+ kota di Indonesia dengan lebih dari 200 varian kopi Nusantara." },
  { year: "2026", title: "Go Global", desc: "Ekspor perdana ke Malaysia dan Singapura. 1.200+ petani binaan di 15 daerah." },
]

const stats = [
  { val: "1.200+", label: "Petani Binaan" },
  { val: "15", label: "Daerah Asal" },
  { val: "200+", label: "Varian Kopi" },
  { val: "20rb+", label: "Pelanggan Puas" },
]

export default function TentangPage() {
  const reduce = useReducedMotion()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5EDE4] via-[#FDF6F0] to-[#F0EBE3] py-20 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 sm:py-28">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob rounded-full bg-primary/10 blur-3xl dark:bg-primary/[0.05]" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-80 w-80 animate-blob rounded-full bg-accent/10 blur-3xl dark:bg-accent/[0.05]" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="card-shadow-hard mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-white">
              <Heart size={12} />
              Cerita Kami
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">
              Tentang <span className="text-primary">KOPI</span> Nusantara
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Berawal dari secangkir kopi di pinggir jalan, tumbuh menjadi gerakan untuk memperkenalkan
              kekayaan kopi Nusantara ke seluruh dunia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-2 border-ink bg-white py-10 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-3xl font-black text-primary sm:text-4xl">{s.val}</p>
                <p className="mt-1 text-xs font-bold text-zinc-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="space-y-5"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black leading-[1.1] tracking-display sm:text-4xl">
                Perjalanan <span className="text-primary">KOPI</span>
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                KOPI Nusantara lahir dari kegelisahan melihat petani kopi lokal kurang mendapatkan tempat
                yang layak. Biji kopi terbaik seringkali dijual murah ke tengkulak, sementara kopi impor
                mendominasi kafe di Indonesia.
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Kami memutuskan untuk menjadi jembatan — menghubungkan petani kopi berkualitas langsung
                dengan pecinta kopi di seluruh Indonesia. Dengan roasting segar setiap minggu dan harga
                yang adil untuk kedua sisi.
              </p>
              <Link href="/katalog">
                <Button className="gap-2 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]">
                  Mulai Jelajahi
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="card-shadow-hard relative overflow-hidden rounded-[2rem] border-2 border-ink"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop"
                  alt="Kopi Nusantara"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold text-white/70">KOPI Nusantara</p>
                <p className="text-lg font-black text-white">Asli Indonesia</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-alt/60 py-16 dark:bg-zinc-900/30 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-display sm:text-4xl">
              Apa yang <span className="text-primary">Kami Percaya</span>
            </h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="card-shadow-hard rounded-2xl border-2 border-ink bg-white p-6 transition-all duration-200 hover:card-shadow-hard-hover dark:bg-zinc-900"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-ink shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                  <v.icon size={20} />
                </div>
                <h3 className="font-black text-ink dark:text-white">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10 text-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-display sm:text-4xl">
              Perjalanan <span className="text-primary">Kami</span>
            </h2>
          </motion.div>
          <div className="relative space-y-0">
            <div className="absolute left-[19px] top-0 h-full w-0.5 bg-ink/10 dark:bg-white/10" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                className="relative flex gap-6 pb-10 last:pb-0"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-white text-xs font-black text-ink shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] dark:bg-zinc-900 dark:text-white">
                  {t.year.slice(2)}
                </div>
                <div className="pt-1">
                  <h3 className="font-black text-ink dark:text-white">{t.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-ink bg-gradient-to-br from-primary to-primary-dark py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            className="space-y-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Coffee size={32} className="mx-auto text-ink/60" />
            <h2 className="text-3xl font-black text-ink tracking-display sm:text-4xl">
              Jadi Bagian dari Cerita
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-ink/80">
              Setiap pembelianmu adalah dukungan langsung untuk petani kopi Nusantara.
            </p>
            <Link href="/katalog">
              <Button
                size="lg"
                className="border-2 border-ink bg-ink text-white shadow-[5px_5px_0px_0px_rgba(26,26,26,0.3)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,0.3)]"
              >
                Belanja Sekarang
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
