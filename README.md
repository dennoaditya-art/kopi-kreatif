# ☕ KOPI Nusantara — Neobrutalist Coffee E-Commerce Template

> Premium Next.js template untuk brand kopi, roastery, dan F&B artisan.  
> Desain neobrutalist berani dengan palette **Olive + Brick + Paper**.

![Preview](https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=630&fit=crop)

---

## ✨ Fitur

- **12 halaman lengkap** — landing, katalog, detail produk, keranjang, checkout, dashboard, auth, tentang, kontak
- **Neobrutalist design system** — hard shadow 4px, border 2px ink, rounded-2xl, tipografi Geist
- **Dark mode** — dual theme dengan CSS custom properties, deteksi sistem + toggle manual
- **Cart system** — localStorage-based dengan `useSyncExternalStore`, kupon diskon, ongkir
- **Product catalog** — filter roast level, search real-time, kategori tabs, layout bento grid
- **Admin dashboard** — statistik pendapatan, tabel pesanan, stok produk
- **Animasi** — Motion (motion/react), scroll reveal, auto-rotate gallery
- **Responsive** — mobile-first, optimal di semua ukuran layar
- **Aksesibilitas** — keyboard navigation, aria-label, focus trap modal/drawer, reduced motion
- **TypeScript** — strict mode, interface untuk semua props

---

## 🚀 Mulai Cepat

```bash
# Clone
git clone https://github.com/dennoaditya-art/kopi-kreatif.git

# Install
npm install

# Setup environment
cp .env.example .env.local

# Jalankan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## 🗺️ Halaman

| Route | Halaman |
|-------|---------|
| `/` | Landing — hero, stats, featured, story, edukasi, testimonial |
| `/katalog` | Katalog produk — filter, search, grid |
| `/produk/[id]` | Detail produk — grind, qty, rating, terkait |
| `/keranjang` | Keranjang — qty, kupon, ringkasan |
| `/checkout` | Checkout — alamat, kirim, bayar, konfirmasi |
| `/masuk` | Login — validasi, error state |
| `/daftar` | Register — validasi, success state |
| `/dashboard` | Dashboard admin — login gate, stats, orders, stock |
| `/tentang` | Tentang — story, timeline, values |
| `/kontak` | Kontak — form + info |

---

## 🎨 Design System

**Palette:**

| Token | Light | Dark |
|-------|-------|------|
| Paper | `#F8F6F0` | `#12100E` |
| Card | `#FFFFFF` | `#1F1B17` |
| Ink | `#1C1814` | `#EDE0D8` |
| Brick | `#B85C3C` | `#B85C3C` |
| Olive | `#7A8B5E` | `#5D6E42` |

**Typography:** Geist (sans) + Geist Mono  
**Shadows:** Hard offset only (`4px 4px 0px`) — no blur

---

## 🧱 Stack

- [Next.js 16](https://nextjs.org) — App Router, Turbopack
- [TypeScript](https://typescriptlang.org) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com) — `@theme inline` design tokens
- [Motion](https://motion.dev) — animation
- [Lucide React](https://lucide.dev) — icons
- [shadcn/ui](https://ui.shadcn.com) — component primitives

---

## 📦 Produksi

```bash
npm run build
npm start
```

Build output: static pages + 1 dynamic route (`/produk/[id]`).  
Deploy one-click ke [Vercel](https://vercel.com).

---

## 📄 Lisensi

MIT — lihat [LICENSE](LICENSE).

---

_Dibuat dengan ❤️ untuk kopi Indonesia._
