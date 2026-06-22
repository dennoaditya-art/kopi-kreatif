"use client"

import type { ReactNode } from "react"
import { FeaturedDefault } from "./featured-default"
import { FeaturedCarousel } from "./featured-carousel"

export type FeaturedVariant = "default" | "carousel"

interface FeaturedProductsProps {
  variant?: FeaturedVariant
  header?: ReactNode
}

export function FeaturedProducts({ variant = "default", header }: FeaturedProductsProps) {
  switch (variant) {
    case "carousel":
      return <FeaturedCarousel header={header} />
    default:
      return <FeaturedDefault header={header} />
  }
}
