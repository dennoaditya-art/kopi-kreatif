import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-xl mb-12">
          <Badge variant="outline" className="mb-4">Blog</Badge>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink">
            Cerita <span className="text-brick">Kopi</span>
          </h1>
          <p className="text-sm text-ink-muted mt-2">
            Artikel seputar kopi Nusantara, tips menyeduh, dan cerita dari para pecinta kopi.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-card rounded-[16px] border-2 border-ink card-shadow-hard hover:card-shadow-hard-hover transition-all duration-200 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:-translate-y-1"
            >
              <div className="sm:w-48 lg:w-56 shrink-0">
                <div className="aspect-[16/9] sm:aspect-[4/3] rounded-[12px] border-2 border-ink/10 overflow-hidden bg-brick/10 relative">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 200px" />
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium">
                  <Badge variant="outline" className="text-[9px]">{post.category}</Badge>
                  <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                </div>
                <h2 className="font-black text-lg sm:text-xl text-ink group-hover:text-brick transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-brick text-xs font-bold pt-1 group">
                  Baca selengkapnya <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
