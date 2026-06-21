# Kopi Nusantara — Style Reference

> Warm neobrutalist coffee zine — paper, brick, olive

**Theme:** light / dark (dual)

Kopi Kreatif beroperasi di atas kanvas neobrutalist yang hangat — latar paper (#F8F6F0) dengan accent brick (#B85C3C) dan olive (#7A8B5E). Terinspirasi dari palate "Olive + Brick + Paper" — earthy, artisan, berani. Tipografi menggunakan Geist (sans geometrik) untuk body dan UI, dengan Geist Mono untuk metadata, harga, dan label struktural. Komponen memiliki border 2px ink (#1C1814), hard shadow tanpa blur (4px), dan radius konsisten rounded-2xl (16px). Setiap elemen dirancang untuk terasa cetak, tactile, dan berani — seperti zine kopi indie.

## Tokens — Colors

### Palette Inti

| Name | Value | Token | Role |
|------|-------|-------|------|
| Paper | `#F8F6F0` | `--color-paper` | Page canvas, section backgrounds — warm off-white |
| Card | `#FFFFFF` | `--color-card` | Card surfaces, modal backgrounds, elevated panels |
| Paper Alt | `#F0EDE4` | `--color-paper-alt` | Alternating section bands — satu langkah di bawah paper |
| Ink | `#1C1814` | `--color-ink` | Primary text, icons, borders, nav — warm near-black |
| Ink Muted | `#8C8273` | `--color-ink-muted` | Secondary text, helper, metadata, captions |
| Brick | `#B85C3C` | `--color-brick` | Single accent — primary actions, highlights, badge fills, decorative bands |
| Brick Deep | `#9A4A30` | `--color-brick-deep` | Hover/active state untuk Brick |
| Olive | `#7A8B5E` | `--color-olive` | Muted secondary accent — success state, organic indicators |
| Surface Ink | `#12100E` | `--color-surface-ink` | Dark mode surface |
| Surface Ink Alt | `#1F1B17` | `--color-surface-alt-ink` | Dark mode card surface |

### Dark Mode Map

| Light | Dark |
|-------|------|
| Paper #F8F6F0 | Surface Ink #12100E |
| Card #FFFFFF | Surface Ink Alt #1F1B17 |
| Paper Alt #F0EDE4 | #1A1612 |
| Ink #1C1814 | #EDE0D8 |
| Ink Muted #8C8273 | #9C9082 |

## Tokens — Typography

### Geist — Primary sans untuk body, nav, buttons, card content, semua functional UI · `--font-geist-sans`
- **Weights:** 400, 500, 700, 900
- **Sizes:** 12px, 14px, 16px, 20px, 24px, 32px, 40px, 48px, 60px
- **Line height:** 0.9 (display), 1.2 (heading), 1.5 (body)
- **Letter spacing:** -0.04em (display), -0.02em (heading), normal (body)
- **Role:** Sistem tipografi utama — dari hero headline hingga body copy.

### Geist Mono — Metadata, harga, label, badge, nav, semua teks struktural · `--font-geist-mono`
- **Weights:** 400, 500, 700
- **Sizes:** 10px, 12px, 14px, 16px
- **Line height:** 1.2–1.5
- **Letter spacing:** 0.05em
- **Role:** Semua teks yang butuh kesan teknis/cetak — harga, badge, label, tombol kecil.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Contoh |
|------|------|--------|-------------|----------------|--------|
| hero | clamp(3rem, 8vw, 5rem) | 900 | 0.9 | -0.04em | Headline utama |
| display | clamp(2rem, 5vw, 3.5rem) | 900 | 0.95 | -0.03em | Section title |
| heading-lg | 28px / 32px | 700 | 1.1 | -0.02em | Featured section |
| heading | 22px / 24px | 700 | 1.2 | normal | Card title |
| body-lg | 16px / 18px | 400 | 1.5 | normal | Paragraph |
| body | 14px | 400 | 1.5 | normal | Body text |
| caption | 12px | 500 | 1.3 | normal | Metadata |
| micro | 10px | 700 | 1.2 | 0.08em | Badge, label |

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Token | Value |
|-------|-------|
| section-gap | 64px–80px |
| section-padding | 64px–80px vertical |
| card-padding | 16px–24px |
| element-gap | 12px–16px |
| container-max | 1280px |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 16px (rounded-2xl) |
| buttons | 16px (rounded-2xl) |
| inputs | 12px (rounded-xl) |
| badges | 9999px (rounded-full) |
| modals | 24px (rounded-3xl) |
| images | 16px (rounded-2xl) |

### Shadows

| Name | Value | Penggunaan |
|------|-------|------------|
| card-shadow-hard | `4px 4px 0px 0px #2C1810` | Default card, button |
| card-shadow-hover | `6px 6px 0px 0px #2C1810` | Hover state |

Semua shadow adalah hard offset tanpa blur. TIDAK ada shadow lembut atau glow.

### Borders

Semua container dan interactive element: **2px solid #2C1810** (Espresso Ink).
Ini adalah signature neobrutalist — border tebal kasih struktur pada layout.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Cream Canvas | `#FDF6F0` | Page background |
| 1 | Linen Beige | `#F5EDE4` | Section alt background |
| 2 | Card White | `#FFFFFF` | Card surfaces, modal |
| 3 | Gold Stamp | `#E8B840` | Highlight band, accent panel |

Dark mode:
| 0 | Surface Ink | `#1A1210` | Page background |
| 1 | Surface Ink Alt | `#2A1F18` | Card surface |
| 2 | Card Surface | `#352A22` | Elevated panel |

## Components

### Primary Button
**Role:** CTA utama — Beli, Daftar, Lanjutkan

Gold Stamp (#E8B840) background, Espresso Ink text, 16px rounded-2xl, Geist 700 14–16px, 2px border #2C1810, `card-shadow-hard`. Padding 12px 24px.
- **Hover:** `card-shadow-hard-hover` (6px 6px), translasi -translate-y-0.5
- **Active:** `translate-x-[2px] translate-y-[2px] shadow-none`

### Secondary Button
**Role:** CTA sekunder — Pelajari, Lihat Semua

Transparent background, 2px border #2C1810, Espresso Ink text, 16px radius, Geist 700 14px.
- **Hover:** Gold Stamp background pada 10% opacity
- **Active:** Sama dengan primary active

### Outline Button
**Role:** Ghost, link-style

Transparent, 2px border transparent, Espresso Ink text, 16px radius.
- **Hover:** border muncul di #2C1810/30

### Product Card
**Role:** E-commerce product tile

Card White (#FFFFFF) surface, 16px rounded-2xl, 2px border #2C1810, `card-shadow-hard`. Padding 16px. Image container aspect-[4/3] dengan object-cover.
- Hover: `card-shadow-hover`, card naik -translate-y-1 scale-102
- Image hover: scale-110 dengan transition 500ms
- Category-based gradient overlay pada hover (single-origin: secondary/20, blends: pine/20)

### Input
**Role:** Form input — search, email, alamat

Card White background, 2px border #2C1810, 12px rounded-xl, Espresso Ink text, padding 12px 16px.
- **Focus:** Gold Stamp ring (ring-2)
- **Placeholder:** Coffee Muted (#8C735F)
- **Error:** Red-600 border + error message below

### Badge
**Role:** Product badge, status label, tag

9999px rounded-full, Geist Mono 10px 700, uppercase, 0.08em tracking, 1px border #2C1810. Padding 4px 10px.
- **Best Seller:** Gold Stamp bg + Espresso text
- **Diskon:** Ember bg + white text
- **Premium:** Pine bg + white text
- **Default:** Card White bg + Espresso text

### Modal / Drawer
**Role:** Cart, product quick view

Card White surface, 24px rounded-3xl, 2px border #2C1810, `card-shadow-hard`. Backdrop: rgba(0,0,0,0.5). Enter: scale 0.95→1 + fade.

### Star Rating
**Role:** Product & testimonial rating

Ember (#D4764A) fill untuk active star, Zinc-200 untuk inactive. Star size 12px.

### Navbar
**Role:** Site-wide navigation

Fixed top, floating "island" style saat scroll. Default: transparent. Scrolled: Card White/85 backdrop-blur-xl, 2px border #2C1810, `card-shadow-hard`, rounded-2xl, width max-w-7xl centered.
- Nav link: Geist 700 14px, underline animasi dari kiri saat hover
- Mobile: Hamburger morph ke X, full overlay menu

## Layout Principles

### Grid System
- CSS Grid (`display: grid`) — TIDAK pernah pakai flexbox percentage math
- Max-width kontainer: 1280px (`mx-auto max-w-7xl`)
- Mobile-first: semua multi-column collapse ke single column di `< 768px`

### Section Diversity (WAJIB)
- Setiap section harus punya layout family BERBEDA
- Satu layout family hanya boleh muncul SATU KALI per page
- **Dilarang:** 3 section berturut-turut dengan pola yang sama
- **Dilarang:** Zigzag image+text alternasi lebih dari 2 kali

### Layout Families yang Diizinkan
1. **Split Hero** — 50/50 text + visual, atau left-aligned + right asset
2. **Bento Grid** — grid asimetris (2fr+1fr, 1fr+2fr, staggered cell sizes)
3. **Card Carousel** — horizontal scroll-snap, bukan grid
4. **Full-width Statement** — quote, statistik besar, manifesto
5. **Staggered Cards** — masonry atau Z-axis cascade
6. **Horizontal Pan** — GSAP horizontal-scroll section
7. **Sticky Stack** — GSAP card-stack on scroll

### Anti-Repetition Rules
- **Maksimal 1 eyebrow per 3 sections.** Hero dihitung sebagai 1.
- **Maksimal 1 marquee per page.**
- **TIDAK BOLEH** ada 3 atau 4 kartu sama rata dalam grid. Selalu variasi ukuran.
- **TIDAK BOLEH** ada hero center (text tengah) — selalu asimetris.
- **TIDAK BOLEH** ada zigzag pattern lebih dari 2 baris.

### Mobile Override
Semua layout asimetris di desktop (`md:`) WAJIB collapse ke single-column di mobile:
```css
w-full px-4 py-8
```
Semua `col-span-*` reset ke `col-span-1`.

## Motion Philosophy

### Engine
- **Motion** (framer-motion v12) untuk entry reveals dan mikro-interaksi
- **GSAP** + **ScrollTrigger** untuk scroll choreography (sticky-stack, horizontal-pan, pin)

### Timing & Easing
- **Default ease:** `[0.16, 1, 0.3, 1]` (spring-like cubic-bezier)
- **Spring physics:** `type: "spring", stiffness: 100, damping: 15`
- **Micro-interactions:** 200ms–300ms
- **Entry reveals:** 400ms–600ms
- **Page transitions:** 500ms–800ms

### Entry Animations
Setiap section WAJIB punya entry animation saat scroll:
- Default: `translate-y-8 opacity-0` → `translate-y-0 opacity-1`
- Stagger: delay `i * 0.08` untuk grid items
- `viewport: { once: true, amount: 0.3 }`

### Micro-interactions
- **Hover card:** `y: -8, scale: 1.02` — spring physics
- **Hover button:** `-translate-y-0.5` + shadow shift
- **Active:** `translate-x-[2px] translate-y-[2px] shadow-none` — tactile push
- **Badge hover:** `scale: 1.1, rotate: 1` — playful feedback

### Scroll-driven Patterns
- **Sticky Stack:** GSAP ScrollTrigger pin setiap card dari `top top` ke `top top` card berikutnya
- **Horizontal Pan:** GSAP ScrollTrigger scrub horizontal slide di dalam pinned wrapper
- **Scroll Reveal:** Motion `whileInView` untuk staggered entry

### Reduced Motion
Semua motion WAJIB honor `prefers-reduced-motion: reduce`:
- Motion: `useReducedMotion()` → jika true, skip semua animasi
- GSAP: `gsap.matchMedia()` dengan kondisi `(prefers-reduced-motion: reduce)` → duration 0

## Do's and Don'ts

### Do
- Gunakan Cream Paper (#FDF6F0) sebagai background utama — bukan pure white
- Gunakan Gold Stamp (#E8B840) sebagai SATU-SATUNYA accent — untuk primary CTA, badge, highlight
- Aplikasikan 2px border #2C1810 di semua container dan interactive element
- Pakai `card-shadow-hard` (4px 4px 0px) untuk neobrutalist signature
- Atur display headlines di Geist 900 dengan negative tracking rapat
- Tulis label, badge, dan metadata di Geist Mono uppercase 0.05em tracking
- Variasikan layout setiap section — tidak ada 2 section dengan layout yang sama

### Don't
- Jangan pakai pure black (#000000) atau pure white (#FFFFFF) — gunakan Espresso Ink dan Cream Paper
- Jangan pakai shadow lembut atau glow — hanya hard offset shadow
- Jangan punya 2 accent color — Gold Stamp adalah satu-satunya accent
- Jangan gunakan 3-column atau 4-column equal grid — selalu variasi ukuran
- Jangan gunakan hero center (text di tengah) — selalu asimetris
- Jangan gunakan pattern zigzag (text-image-text-image) lebih dari 2 baris
- Jangan lupa dark mode — setiap warna punya pasangan gelap
- Jangan letakkan emoji di UI — gunakan lucide-react icon
- Jangan pakai AI copywriting cliché ("Elevate", "Seamless", "Next-Gen")

## Quick Start

### Tailwind v4

```css
@import "tailwindcss";

@theme inline {
  --color-cream-paper: #FDF6F0;
  --color-card-white: #FFFFFF;
  --color-linen-beige: #F5EDE4;
  --color-espresso: #2C1810;
  --color-coffee-muted: #8C735F;
  --color-gold: #E8B840;
  --color-gold-deep: #D4A630;
  --color-ember: #D4764A;
  --color-pine: #6B8F5E;
  --color-surface-ink: #1A1210;
  --color-surface-alt-ink: #2A1F18;

  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  --radius-card: 16px;
  --radius-button: 16px;
  --radius-input: 12px;
  --radius-modal: 24px;

  --shadow-card: 4px 4px 0px 0px #2C1810;
  --shadow-card-hover: 6px 6px 0px 0px #2C1810;
}
```

### CSS Custom Properties

```css
:root {
  --color-cream-paper: #FDF6F0;
  --color-card-white: #FFFFFF;
  --color-linen-beige: #F5EDE4;
  --color-espresso: #2C1810;
  --color-coffee-muted: #8C735F;
  --color-gold: #E8B840;
  --color-gold-deep: #D4A630;
  --color-ember: #D4764A;
  --color-pine: #6B8F5E;

  --shadow-card: 4px 4px 0px 0px #2C1810;
  --shadow-card-hover: 6px 6px 0px 0px #2C1810;
}

.dark {
  --color-cream-paper: #1A1210;
  --color-card-white: #2A1F18;
  --color-linen-beige: #352A22;
  --color-espresso: #EDE0D8;
  --color-coffee-muted: #A1A1AA;
}
```

## Similar Brands

- **Buy Me a Coffee** — same warm cream-paper canvas, single accent color, floating cards, pill buttons
- **Little Amps** — same coffee-zine editorial feel, monospace labels, raw typography, flat surfaces
- **Redbrick Coffee** — same bold editorial storefront, single chromatic thread, section rhythm
- **Touchy Coffee** — same DIY playful spirit, monospace-heavy UI, handcrafted feel
