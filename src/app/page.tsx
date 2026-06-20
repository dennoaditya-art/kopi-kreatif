import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { StorySection } from "@/components/story-section"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <StorySection />
      <Testimonials />
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </>
  )
}
