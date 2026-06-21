"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Coffee, Sun, Moon } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { totalItems } = useCart()
  const reduce = useReducedMotion()
  const { theme, toggle: toggleTheme } = useTheme()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "top-3 mx-3 max-w-[calc(100%-1.5rem)] lg:mx-auto lg:left-0 lg:right-0 lg:max-w-7xl rounded-[16px] bg-card/85 backdrop-blur-xl border-2 border-ink card-shadow-hard"
          : "bg-transparent"
      )}
      initial={reduce ? false : { y: -100 }}
      animate={reduce ? undefined : { y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <motion.div
        className="mx-auto flex items-center justify-between px-4 sm:px-6"
        animate={scrolled ? { height: 52 } : { height: 72 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tight shrink-0 group">
          <span className="bg-ink text-paper rounded-[12px] px-2.5 py-1 border-2 border-ink flex items-center gap-1">
            <Coffee size={18} />
            KOPI
          </span>
          <span className="hidden sm:inline text-ink">Nusantara</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors relative py-1",
                "after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-0 after:bg-brick after:rounded-full after:transition-all after:duration-300 hover:after:w-full",
                "text-ink-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/keranjang" className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Keranjang belanja"
              className="rounded-xl"
            >
              <ShoppingCart size={20} />
            </Button>
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-brick text-white text-[10px] font-bold flex items-center justify-center leading-none border border-ink"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </Link>
          <Link
            href="/masuk"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold transition-colors hover:text-brick text-ink-muted"
          >
            Masuk
          </Link>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-[12px] border-2 border-ink bg-card text-ink transition-all duration-200 hover:bg-brick/20 hover:text-brick active:translate-x-[1px] active:translate-y-[1px]"
            aria-label={theme === "light" ? "Mode gelap" : "Mode terang"}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link href="/katalog" className="hidden sm:block">
            <Button size="sm">
              Beli Sekarang
            </Button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-[12px] border-2 border-ink bg-card text-ink"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-paper/95 backdrop-blur-lg dark:bg-surface-ink/95 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center rounded-xl border-2 border-ink bg-card text-ink"
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-black text-ink hover:text-brick transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="flex flex-col items-center gap-3 w-full max-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.4 }}
            >
              <Link href="/masuk" onClick={() => setOpen(false)} className="text-sm font-bold text-ink-muted hover:text-brick transition-colors">
                Masuk
              </Link>
              <Link href="/katalog" onClick={() => setOpen(false)} className="w-full">
                <Button className="w-full text-base">Beli Sekarang</Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
