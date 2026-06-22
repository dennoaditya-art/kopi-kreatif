"use client"

import { useState, useEffect } from "react"
import { useReducedMotion } from "motion/react"
import { products } from "@/lib/coffee-data"
import { HeroDefault } from "./hero-default"
import { HeroCentered } from "./hero-centered"
import { HeroSplit } from "./hero-split"

export const HERO_PRODUCTS = products.slice(0, 4)

export type HeroVariant = "default" | "centered" | "split"

interface HeroProps {
  variant?: HeroVariant
}

export function Hero({ variant = "default" }: HeroProps) {
  const [current, setCurrent] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_PRODUCTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [reduce])

  const item = HERO_PRODUCTS[current]
  const shared = { current, setCurrent, item, reduce }

  switch (variant) {
    case "centered":
      return <HeroCentered {...shared} />
    case "split":
      return <HeroSplit {...shared} />
    default:
      return <HeroDefault {...shared} />
  }
}
