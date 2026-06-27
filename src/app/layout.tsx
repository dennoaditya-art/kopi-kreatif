import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { OrderProvider } from "@/lib/order-context"
import { ThemeProvider } from "@/lib/theme-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastProvider } from "@/components/ui/toast"
import { ScrollToTop } from "@/components/scroll-to-top"
import { I18nProvider } from "@/lib/i18n/context"
import { AuthProvider } from "@/lib/auth-context"
import { LangAttributeUpdater } from "@/hooks/use-lang-attribute"

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
  title: {
    default: "KOPI — Bubuk Kopi Nusantara Premium",
    template: "%s | KOPI Nusantara",
  },
  description: "Jelajahi cita rasa kopi bubuk pilihan dari berbagai daerah di Indonesia. Segar, murni, tanpa campuran.",
  openGraph: {
    title: "KOPI Nusantara — Neobrutalist Coffee E-Commerce Template",
    description: "Premium Next.js template untuk brand kopi, roastery, dan F&B artisan. Desain neobrutalist berani dengan palette Olive + Brick + Paper.",
    url: "https://kopi-kreatif.vercel.app",
    siteName: "KOPI Nusantara",
    images: [{ url: "/preview.png", width: 1440, height: 900 }],
    locale: "id_ID",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/icon-192.png" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col antialiased">
        <div itemScope itemType="https://schema.org/Organization" style={{ display: "none" }}>
          <meta itemProp="name" content="KOPI Nusantara" />
          <meta itemProp="url" content="https://kopi-kreatif.vercel.app" />
          <meta itemProp="logo" content="https://kopi-kreatif.vercel.app/preview.png" />
          <meta itemProp="description" content="Premium coffee e-commerce template. Bubuk kopi Nusantara pilihan." />
          <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <meta itemProp="telephone" content="+62-812-3456-7890" />
            <meta itemProp="contactType" content="customer service" />
            <meta itemProp="availableLanguage" content="Indonesian,English" />
          </div>
          <link itemProp="sameAs" href="https://instagram.com/kopi-nusantara" />
          <link itemProp="sameAs" href="https://tiktok.com/@kopi-nusantara" />
        </div>
        <div itemScope itemType="https://schema.org/WebSite" style={{ display: "none" }}>
          <meta itemProp="name" content="KOPI Nusantara" />
          <meta itemProp="url" content="https://kopi-kreatif.vercel.app" />
          <meta itemProp="potentialAction" content="https://kopi-kreatif.vercel.app/katalog?search={search_term_string}" />
        </div>
        <ThemeProvider>
          <I18nProvider>
            <LangAttributeUpdater />
            <AuthProvider>
            <CartProvider>
              <WishlistProvider>
              <OrderProvider>
              <ToastProvider>
              <Navbar />
              <ErrorBoundary>
                <main className="flex-1">{children}</main>
              </ErrorBoundary>
              <ScrollToTop />
              <Footer />
              </ToastProvider>
              </OrderProvider>
              </WishlistProvider>
            </CartProvider>
            </AuthProvider>
          </I18nProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
