import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastProvider } from "@/components/ui/toast"
import { ScrollToTop } from "@/components/scroll-to-top"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kopi-kreatif.vercel.app"),
  title: "KOPI — Bubuk Kopi Nusantara Premium",
  description: "Jelajahi cita rasa kopi bubuk pilihan dari berbagai daerah di Indonesia. Segar, murni, tanpa campuran.",
  openGraph: {
    title: "KOPI Nusantara — Neobrutalist Coffee E-Commerce Template",
    description: "Premium Next.js template untuk brand kopi, roastery, dan F&B artisan. Desain neobrutalist berani dengan palette Olive + Brick + Paper.",
    url: "https://kopi-nusantara.vercel.app",
    siteName: "KOPI Nusantara",
    images: [{ url: "/preview.png", width: 1440, height: 900 }],
    locale: "id_ID",
    type: "website",
  },
}

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('kopi-theme');
      if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })()
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col antialiased">
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KOPI Nusantara",
              url: "https://kopi-kreatif.vercel.app",
              logo: "https://kopi-kreatif.vercel.app/preview.png",
              description: "Premium coffee e-commerce template. Bubuk kopi Nusantara pilihan.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-812-3456-7890",
                contactType: "customer service",
                availableLanguage: ["Indonesian", "English"],
              },
              sameAs: ["https://instagram.com/kopi-nusantara", "https://tiktok.com/@kopi-nusantara"],
            }),
          }}
        />
        <Script id="schema-website" type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KOPI Nusantara",
              url: "https://kopi-kreatif.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://kopi-kreatif.vercel.app/katalog?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <ErrorBoundary>
                <main className="flex-1">{children}</main>
              </ErrorBoundary>
              <ScrollToTop />
              <Footer />
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </body>
    </html>
  )
}
