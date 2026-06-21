"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Bean, Droplets, MapPin, ChevronRight, Mountain, CloudSun, Trees, Sprout, Leaf, Factory, LocateFixed, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface CoffeeType {
  name: string
  latin: string
  desc: string
  regions: string[]
}

const coffeeTypes: CoffeeType[] = [
  {
    name: "Arabika",
    latin: "Coffea Arabica",
    desc: "Jenis kopi paling populer di Indonesia. Tumbuh di dataran tinggi 1000–2000 mdpl. Cita rasa ringan dengan acidity tinggi dan aroma kompleks — floral, fruity, citrus. Produksi ±60% dari total kopi Indonesia.",
    regions: ["Aceh Gayo", "Toraja", "Kintamani", "Java Ijen"],
  },
  {
    name: "Robusta",
    latin: "Coffea Canephora",
    desc: "Jenis kopi lebih kuat dan tahan hama. Tumbuh di dataran rendah 400–800 mdpl. Kandungan kafein 2x lipat Arabika, body tebal, rasa earthy dan pahit. Cocok untuk espresso dan campuran.",
    regions: ["Temanggung", "Lampung", "Jawa Timur"],
  },
  {
    name: "Liberika",
    latin: "Coffea Liberica",
    desc: "Jenis kopi langka dengan biji besar dan bentuk asimetris. Aroma unik — fruity, floral, smoky. Tumbuh di lahan gambut dan rawa. Produksi sangat terbatas, hanya ±1% dari kopi dunia.",
    regions: ["Pulau Riau", "Kalimantan"],
  },
]

interface Origin {
  name: string
  elevation: string
  flavor: string
  icon: React.ReactNode
}

const origins: Origin[] = [
  { name: "Aceh Gayo", elevation: "1200–1600 mdpl", flavor: "Jeruk, Cokelat Susu, Herbal", icon: <Mountain size={16} /> },
  { name: "Toraja", elevation: "1400–1800 mdpl", flavor: "Buah Tropis, Dark Chocolate", icon: <CloudSun size={16} /> },
  { name: "Kintamani", elevation: "900–1500 mdpl", flavor: "Lemon, Jeruk Bali, Gula Aren", icon: <Trees size={16} /> },
  { name: "Temanggung", elevation: "400–800 mdpl", flavor: "Kacang, Kayu Manis, Earthy", icon: <Sprout size={16} /> },
  { name: "Java Ijen", elevation: "1000–1600 mdpl", flavor: "Melati, Kayu Manis, Madu", icon: <Leaf size={16} /> },
  { name: "Flores", elevation: "1200–1700 mdpl", flavor: "Buah Hitam, Gula Bakar", icon: <Factory size={16} /> },
  { name: "Papua", elevation: "1300–1800 mdpl", flavor: "Tembakau, Rempah, Kakao", icon: <LocateFixed size={16} /> },
  { name: "Lampung", elevation: "400–900 mdpl", flavor: "Earthy, Cokelat Hitam", icon: <Flame size={16} /> },
]

export function CoffeeEducation() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 sm:mb-16 ml-0"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="card-shadow-hard inline-flex items-center gap-2 rounded-[16px] border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-paper">
            <Bean size={12} aria-hidden="true" />
            Edukasi Kopi
          </span>
          <h2 className="text-3xl font-black leading-[1.05] sm:text-4xl lg:text-5xl text-ink mt-3">
            Jenis & Asal <span className="text-brick">Kopi Nusantara</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Indonesia adalah salah satu penghasil kopi terbesar di dunia. Dari Sabang sampai Merauke,
            setiap daerah punya karakter dan cita rasa yang unik.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12 sm:mb-20">
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="card-shadow-hard relative overflow-hidden rounded-[24px] border-2 border-ink">
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=450&fit=crop"
                  alt="Tangan petani kopi memeriksa biji kopi pilihan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-2 rounded-[16px] border-2 border-ink bg-brick px-3 py-1.5 text-xs font-bold text-ink">
                  <Droplets size={12} aria-hidden="true" />
                  Dari Petani
                </span>
                <h3 className="text-xl font-black text-white sm:text-2xl">Tangan-tangan Penuh Cita Rasa</h3>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-white/70 sm:text-sm">
                  Setiap biji kopi melewati perjalanan panjang dari tangan petani hingga ke cangkir kamu.
                </p>
              </div>
            </div>

            <motion.div
              className="card-shadow-hard absolute -bottom-3 -right-3 z-20 rounded-[16px] border-2 border-ink bg-olive px-5 py-3 text-white lg:-right-5"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Petani Binaan</p>
              <p className="text-lg font-black">1.200+</p>
            </motion.div>
          </motion.div>

          <div className="order-1 space-y-4 sm:space-y-5 lg:order-2">
            {coffeeTypes.map((type, i) => (
              <motion.div
                key={type.name}
                className="card-shadow-hard rounded-[16px] border-2 border-ink bg-card p-5 transition-all duration-200 hover:card-shadow-hard-hover"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={reduce ? undefined : { x: 3, y: -3 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border-2 border-ink bg-ink text-paper"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Bean size={20} aria-hidden="true" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-ink sm:text-lg">{type.name}</h3>
                      <span className="font-mono text-[11px] italic text-ink-muted">{type.latin}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      {type.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {type.regions.map((r) => (
                        <span
                          key={r}
                          className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-[10px] font-bold text-ink"
                        >
                          <MapPin size={8} aria-hidden="true" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="space-y-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-ink sm:text-2xl">
              Daerah Asal <span className="text-brick">Pilihan</span>
            </h3>
            <span className="text-xs font-bold text-ink-muted">8 region utama</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {origins.map((origin, i) => (
              <motion.div
                key={origin.name}
                className="card-shadow-hard rounded-[12px] border-2 border-ink bg-card p-4 transition-all duration-200 hover:card-shadow-hard-hover"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5 text-ink">
                  {origin.icon}
                </div>
                <h4 className="mt-2 text-sm font-black text-ink">{origin.name}</h4>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-ink-muted">
                  <Flame size={10} aria-hidden="true" />
                  {origin.elevation}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
                  {origin.flavor}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/katalog"
              className="card-shadow-hard inline-flex items-center gap-2 rounded-[16px] border-2 border-ink bg-brick px-5 py-2.5 text-sm font-bold text-ink transition-all hover:card-shadow-hard-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Jelajahi Semua Varian
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
