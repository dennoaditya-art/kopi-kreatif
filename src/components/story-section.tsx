"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Sprout, Leaf, MapPin, BadgeCheck, Coffee } from "lucide-react"

const values = [
  { icon: Sprout, title: "Petani Lokal", desc: "Bekerja langsung dengan petani kopi di seluruh Nusantara untuk hasil terbaik.", color: "from-primary to-ink", bg: "bg-primary/10", border: "border-ink", iconBg: "bg-ink text-white", featured: true },
  { icon: Leaf, title: "Fresh Roasted", desc: "Dipanggang setiap minggu dalam batch kecil untuk menjaga kesegaran maksimal.", color: "from-secondary to-ink", bg: "bg-secondary/10", border: "border-ink", iconBg: "bg-ink text-white", featured: false },
  { icon: MapPin, title: "Single Origin", desc: "Setiap varian berasal dari satu daerah, menjaga keunikan karakter rasanya.", color: "from-accent to-ink", bg: "bg-accent/10", border: "border-ink", iconBg: "bg-ink text-white", featured: false },
  { icon: BadgeCheck, title: "Jaminan Kualitas", desc: "Setiap batch diuji secara ketat sebelum dikirim ke pelanggan.", color: "from-tertiary to-ink", bg: "bg-tertiary/10", border: "border-ink", iconBg: "bg-ink text-white", featured: false },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function StorySection() {
  const reduce = useReducedMotion()

  return (
    <section id="tentang" className="py-16 sm:py-20 bg-gradient-to-b from-surface-alt/40 to-white dark:from-zinc-900/50 dark:to-zinc-950 relative overflow-hidden">
      {/* Decorative floating coffee beans */}
      <motion.div
        className="absolute -top-10 right-20 text-primary/20 dark:text-primary/10 text-6xl select-none pointer-events-none"
        animate={reduce ? undefined : { y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Coffee size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-accent/20 dark:text-accent/10 text-6xl select-none pointer-events-none"
        animate={reduce ? undefined : { y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Coffee size={36} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-10 text-secondary/15 dark:text-secondary/10 text-6xl select-none pointer-events-none"
        animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Coffee size={28} />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            className="space-y-5"
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="tracking-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05]">
              Dari Petani, <span className="text-primary">Untukmu</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg text-sm sm:text-base">
              Kami percaya kopi yang enak dimulai dari hubungan yang baik dengan petani. Kami bekerja langsung dengan petani kopi di berbagai daerah Indonesia.
            </p>
            <motion.div
              className="inline-block rounded-2xl bg-primary/10 dark:bg-primary/20 border-2 border-ink card-shadow-hard px-6 py-4"
              whileHover={{ x: 3, y: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <p className="text-2xl font-black text-ink">{">"} 15+</p>
              <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Daerah asal biji kopi di seluruh Indonesia</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-3 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value) => (
              value.featured ? (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="sm:col-span-2 bg-gradient-to-br from-primary to-ink rounded-2xl p-5 relative overflow-hidden min-h-[160px] flex items-end border-2 border-ink card-shadow-hard"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
                  <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                  <div className="relative z-10 flex items-start gap-3 w-full">
                    <motion.div
                      className="h-10 w-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/20"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <value.icon size={18} />
                    </motion.div>
                    <div className="text-white">
                      <h3 className="font-bold text-sm">{value.title}</h3>
                      <p className="text-xs text-white/80 leading-relaxed max-w-md">{value.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={reduce ? undefined : { y: -5, rotate: -0.5 }}
                  className={`${value.bg} rounded-2xl border-2 ${value.border} p-4 space-y-2.5 card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200`}
                >
                  <motion.div
                    className={`h-10 w-10 rounded-xl ${value.iconBg} flex items-center justify-center border border-ink`}
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <value.icon size={18} />
                  </motion.div>
                  <h3 className="font-bold text-sm">{value.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              )
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
