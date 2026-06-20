import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { ErrorBoundary } from "@/components/error-boundary"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "KOPI — Bubuk Kopi Nusantara Premium",
  description: "Jelajahi cita rasa kopi bubuk pilihan dari berbagai daerah di Indonesia. Segar, murni, tanpa campuran.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <CartProvider>
          <Navbar />
          <ErrorBoundary>
            <main className="flex-1">{children}</main>
          </ErrorBoundary>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
