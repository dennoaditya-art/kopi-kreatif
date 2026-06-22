import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { T } from "@/lib/i18n/t"

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
          <ArrowLeft size={14} /> <T k="blog.kembali" />
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

          <div className="aspect-[16/9] rounded-[16px] border-2 border-ink/10 overflow-hidden bg-brick/10 relative mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
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
          <p className="text-sm text-ink-muted mb-4"><T k="blog.lainnya" /></p>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <T k="blog.lihat_semua" /> <ArrowLeft size={14} className="rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
