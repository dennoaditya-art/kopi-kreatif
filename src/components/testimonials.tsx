"use client"

import { TestimonialsCards } from "./testimonials-cards"
import { TestimonialsMarquee } from "./testimonials-marquee"

export type TestimonialVariant = "cards" | "marquee"

interface TestimonialsProps {
  variant?: TestimonialVariant
}

export function Testimonials({ variant = "cards" }: TestimonialsProps) {
  switch (variant) {
    case "marquee":
      return <TestimonialsMarquee />
    default:
      return <TestimonialsCards />
  }
}
