"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

const featured = products.slice(0, 4)

const BENTO_LAYOUT = [
  { span: "col-span-full lg:col-span-2 lg:row-span-2", index: 0 },
  { span: "sm:col-span-1 lg:col-span-1 lg:row-span-1", index: 1 },
  { span: "sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1", index: 2 },
  { span: "col-span-full sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-2", index: 3 },
]

interface FeaturedDefaultProps {
  header?: ReactNode
}

export function FeaturedDefault({ header }: FeaturedDefaultProps) {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  return (
    <section className="py-16 sm:py-20 bg-paper relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {header ?? (
          <div className="flex items-end justify-between gap-4 mb-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
                {t("featured.title_start")} <span className="text-brick">{t("featured.title_end")}</span>
              </h2>
              <p className="text-sm text-ink-muted mt-1">{t("katalog.desc")}</p>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/katalog">
                <Button variant="outline" size="sm" className="gap-2 text-xs group">
                  {t("blog.lihat_semua")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
          {BENTO_LAYOUT.map(({ span, index }) => {
            const product = featured[index]
            const isHero = index === 0

            return (
              <motion.div
                key={product.id}
                className={span}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <Link
                  href={`/produk/${product.id}`}
                  className={`group block bg-card rounded-[16px] border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200 h-full ${
                    isHero ? "" : "hover:-translate-y-1"
                  }`}
                >
                  <div className={`relative overflow-hidden ${isHero ? "min-h-[220px] sm:min-h-full" : "aspect-[1/1] sm:aspect-[4/3]"}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                      sizes={isHero ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 50vw"}
                    />

                    {product.badge && (
                      <div className={`absolute z-10 ${isHero ? "top-4 left-4" : "top-3 left-3"}`}>
                        <Badge variant={
                          product.badge === "Best Seller" ? "default" :
                          product.badge === "Premium" ? "olive" : "brick"
                        }>
                          {product.badge}
                        </Badge>
                      </div>
                    )}

                    {isHero && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    )}
                    {isHero && (
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest">{product.category.replace("-", " ")}</p>
                        <h3 className="text-white font-black text-lg -mt-0.5">{product.name}</h3>
                        <p className="text-white/80 text-sm">{product.tagline}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-white font-black text-lg">Rp{product.price.toLocaleString("id-ID")}</span>
                          <span className="flex items-center gap-1 text-brick text-xs font-bold">
                            <Star size={10} fill="currentColor" /> {product.rating}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isHero && (
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm leading-tight group-hover:text-brick transition-colors text-ink">
                            {product.name}
                          </h3>
                          <p className="text-[12px] text-ink-muted font-medium">{product.tagline}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold shrink-0 bg-brick/10 px-1.5 py-0.5 rounded-lg border border-brick/20">
                          <Star size={10} fill="currentColor" className="text-brick" />
                          <span className="text-ink">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="font-black tracking-tight text-ink text-base">
                          Rp{product.price.toLocaleString("id-ID")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-ink-muted line-through">
                            Rp{product.originalPrice.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium">
                        <span>{product.weight}</span>
                        <span className="w-1 h-1 rounded-full bg-ink/20" />
                        <span className="font-bold">{product.roastLevel}</span>
                      </div>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
