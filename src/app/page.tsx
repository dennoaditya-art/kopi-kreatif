import { Hero } from "@/components/hero"
import { StatsBanner } from "@/components/stats-banner"
import { FeaturedProducts } from "@/components/featured-products"
import { StorySection } from "@/components/story-section"
import { CoffeeEducation } from "@/components/coffee-education"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <>
      <Hero variant="split" />
      <StatsBanner />
      <FeaturedProducts variant="default" />
      <StorySection />
      <CoffeeEducation />
      <Testimonials />
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </>
  )
}
