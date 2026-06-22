import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-muted hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Kembali ke Blog
        </Link>

        <article>
          <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium mb-4">
            <Badge variant="outline" className="text-[9px]">{post.category}</Badge>
            <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
          </div>

          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink mb-4">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-ink/10">
            <div className="h-10 w-10 rounded-full bg-brick flex items-center justify-center">
              <User size={16} className="text-ink" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{post.author}</p>
              <p className="text-[11px] text-ink-muted">{post.date} · {post.readTime}</p>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-[16px] bg-brick/10 border-2 border-ink/10 flex items-center justify-center mb-10">
            <span className="font-black text-6xl sm:text-8xl text-brick/20">K</span>
          </div>

          <div className="prose prose-sm sm:prose-base max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm sm:text-base leading-relaxed text-ink/80 mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-ink/10 text-center">
          <p className="text-sm text-ink-muted mb-4">Artikel menarik lainnya?</p>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Lihat Semua Artikel <ArrowLeft size={14} className="rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
