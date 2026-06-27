# Kopi Nusantara — Design System

> Neobrutalist coffee e-commerce — earth, artisan, bold

**Theme:** light / dark (dual)

Palette "Olive + Brick + Paper": latar paper warm-off-white (#F8F6F0) dengan accent brick (#B85C3C) dan muted secondary olive (#7A8B5E). Tipografi: Geist (sans) untuk body/UI, Geist Mono (mono) untuk metadata/harga/label. Komponen 2px border ink, hard shadow 4px offset tanpa blur, radius rounded-2xl (16px). Neobrutalist — cetak, tactile, berani.

## Tokens — Colors

### Palette Inti

| Name | Light | Dark | Token | Role |
|------|-------|------|-------|------|
| Paper | `#F8F6F0` | `#12100E` | `--color-paper` | Page canvas, section backgrounds |
| Card | `#FFFFFF` | `#1F1B17` | `--color-card` | Card surfaces, modal, elevated panels |
| Paper Alt | `#F0EDE4` | `#1A1612` | `--color-paper-alt` | Alternating section bands |
| Ink | `#1C1814` | `#EDE0D8` | `--color-ink` | Primary text, icons, borders, nav |
| Ink Muted | `#6B5E4F` | `#9C9082` | `--color-ink-muted` | Secondary text, metadata, caption |
| Brick | `#B85C3C` | `#B85C3C` | `--color-brick` | Primary accent — actions, highlight, badge |
| Brick Deep | `#9A4A30` | `#7A3820` | `--color-brick-deep` | Hover/active untuk Brick, CTA background |
| Olive | `#7A8B5E` | `#5D6E42` | `--color-olive` | Secondary accent — success state, organic |
| Plum | `#42344B` | `#42344B` | `--color-plum` | Dashboard accent — icon containers, gradient |
| Plum Medium | `#5A4869` | `#5A4869` | `--color-plum-medium` | Dashboard gradient partner for Plum |
| Surface Ink | `#12100E` | — | `--color-surface-ink` | Dark mode surface (dark setara light-ink) |
| Surface Ink Alt | `#1F1B17` | — | `--color-surface-alt-ink` | Dark mode card surface |

## Tokens — Typography

### Geist (sans) — Primary · `--font-geist-sans`
Weights: 400, 500, 700, 900. Untuk hero headline hingga body copy.

### Geist Mono (mono) — Structural · `--font-geist-mono`
Weights: 400, 500, 700. Untuk harga, badge, label, metadata, nav.

### Type Scale

| Role | Size | Weight | Line H | Letter Spacing |
|------|------|--------|--------|----------------|
| hero | clamp(2.5rem, 8vw, 5rem) | 900 | 0.9 | -0.04em |
| display | clamp(2rem, 5vw, 3.5rem) | 900 | 0.95 | -0.03em |
| heading-lg | 28px/32px | 700 | 1.1 | -0.02em |
| heading | 22px/24px | 700 | 1.2 | normal |
| body-lg | 16px/18px | 400 | 1.5 | normal |
| body | 14px | 400 | 1.5 | normal |
| caption | 12px | 500 | 1.3 | normal |
| micro | 10px | 700 | 1.2 | 0.08em |

## Tokens — Spacing & Shapes

**Base:** 4px · **Density:** comfortable

| Token | Value |
|-------|-------|
| section-gap | 64–80px |
| card-padding | 16–24px |
| container-max | 1280px |

### Border Radius

| Element | Value |
|---------|-------|
| card | 16px (rounded-2xl) |
| button | 16px (rounded-2xl) |
| input | 12px (rounded-xl) |
| badge | 9999px (rounded-full) |
| modal | 24px (rounded-3xl) |

### Shadows — Hard offset only, no blur

| Name | Value |
|------|-------|
| card-shadow-hard | `4px 4px 0px 0px var(--ink)` |
| card-shadow-hard-hover | `6px 6px 0px 0px var(--ink)` |

### Borders — 2px solid var(--ink) di semua container & interactive element

## Components

### Button — Primary (brick)
`bg-brick text-ink` · border 2px ink · `card-shadow-hard` · hover `-translate-y-0.5` + `card-shadow-hard-hover` · active `translate-x-[2px] translate-y-[2px] shadow-none` · focus-visible ring-2 brick

**Variants:** `brick` (bg-brick text-white), `olive` (bg-olive text-white), `outline` (bg-card, hover bg-brick/10), `ghost` (transparent, hover border-ink/30), `danger` (bg-red-600 text-white)

**Sizes:** sm (h-9 px-4), md (h-11 px-6), lg (h-13 px-8), icon (h-11 w-11)

### Badge
`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest font-mono` · border ink

**Variants:** `default` (bg-brick text-white), `brick` (bg-brick text-ink), `olive` (bg-olive text-white), `outline` (bg-card text-ink), `destructive`, `success`

### Input
`h-11 w-full rounded-xl border-2 border-ink bg-card` · focus-visible ring-2 brick · placeholder `text-ink-muted`

### Modal
`rounded-[24px] border-2 border-ink bg-card p-6 card-shadow-hard` · backdrop black/50 backdrop-blur · focus trap · escape to close

### Drawer
Sisi kanan/kiri · `max-w-sm w-[90vw] sm:max-w-md` · `h-full flex flex-col` · header + scrollable body

### Product Card
`rounded-[16px] border-2 border-ink bg-card p-0 card-shadow-hard` · image `aspect-[4/3]` object-cover · hover `-translate-y-1` + `card-shadow-hard-hover` · flavor tag hover scale/rotate

### Navbar
Fixed top · default transparent · scrolled: `bg-card/85 backdrop-blur-xl border-2 border-ink card-shadow-hard rounded-[16px] top-3` · mobile: hamburger → overlay menu

## Layout Principles

- CSS Grid (never flexbox % math)
- Max-width: 1280px (`mx-auto max-w-7xl`)
- Mobile-first: collapse to single column below breakpoint
- Setiap section layout family berbeda — dilarang 3 section berturut-turut pola sama
- Hanya GSAP + Motion untuk animasi (no bounce/elastic)
- `useReducedMotion()` honored everywhere

## Do's and Don'ts

### Do
- `bg-paper` sebagai background utama
- Brick sebagai primary accent
- 2px border ink di container & interactive element
- `card-shadow-hard` untuk neobrutalist signature
- Geist Mono untuk label/badge/metadata
- Variasi layout tiap section

### Don't
- Pure black/white
- Soft shadow atau glow
- Gradient text
- Glassmorphism dekoratif
- Hero-metric template
- Identical card grids
- Eyebrow > 1 per 3 sections
- Emoji di UI (pakai lucide-react)
