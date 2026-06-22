import { Badge } from "@/components/ui/badge"
import { Coffee, Globe, Server, ShoppingCart, Palette, FileText } from "lucide-react"

const STEPS = [
  {
    icon: Server,
    title: "1. Instalasi",
    items: [
      "Buka terminal di folder project",
      "Jalankan: npm install",
      "Tunggu hingga semua dependencies terinstall",
      "Selesai — project siap digunakan",
    ],
  },
  {
    icon: Coffee,
    title: "2. Konten Produk",
    items: [
      "Buka src/lib/coffee-data.ts",
      "Edit array products — ganti nama, harga, deskripsi, gambar",
      "Sesuaikan flavorNotes, origin, roastLevel sesuai produk kamu",
      "Edit array testimonials dengan ulasan pelanggan asli",
    ],
  },
  {
    icon: Palette,
    title: "3. Branding",
    items: [
      "Buka src/config/index.ts — ganti SITE_CONFIG.name, tagline, sosial media",
      "Buka src/app/globals.css — sesuaikan warna Brick/Olive jika perlu",
      "Ganti favicon di src/app/favicon.ico dengan logo kamu",
      "Edit gambar produk di folder public/",
    ],
  },
  {
    icon: ShoppingCart,
    title: "4. Toko",
    items: [
      "Atur ongkos kirim di src/config/index.ts (freeThreshold, standardFee)",
      "Sesuaikan berat dan grind option di coffee-data.ts",
      "Test alur: katalog → detail → keranjang → checkout",
    ],
  },
  {
    icon: Globe,
    title: "5. Deploy ke Vercel",
    items: [
      "Buat akun di vercel.com (gratis)",
      "Install Vercel CLI: npm i -g vercel",
      "Jalankan: vercel dari folder project",
      "Ikuti wizard — Vercel auto-detect Next.js",
      "Dapatkan URL: https://project-kamu.vercel.app",
    ],
  },
  {
    icon: FileText,
    title: "6. Custom Domain (Opsional)",
    items: [
      "Beli domain di Niagahoster/Domainesia",
      "Di Vercel dashboard → project → Domains",
      "Masukkan domain kamu",
      "Ikuti petunjuk setting DNS (biasanya CNAME ke cname.vercel-dns.com)",
    ],
  },
]

export default function SetupGuidePage() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center mb-12">
          <Badge variant="olive" className="mb-4">Panduan</Badge>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink">
            Panduan <span className="text-brick">Instalasi</span>
          </h1>
          <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto">
            Dari folder kosong sampai toko online kopi kamu live — berikut langkah-langkahnya.
          </p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="bg-card rounded-[16px] border-2 border-ink card-shadow-hard p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-[12px] bg-brick border-2 border-ink flex items-center justify-center shrink-0">
                  <step.icon size={16} className="text-ink" />
                </div>
                <h2 className="font-black text-lg text-ink">{step.title}</h2>
              </div>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brick shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-5 sm:p-6 rounded-[16px] border-2 border-brick/30 bg-brick/5 text-center">
          <p className="text-sm font-bold text-ink">
            Butuh bantuan? Hubungi kami di {">"} <span className="text-brick">@kopi_nusantara</span>
          </p>
        </div>
      </div>
    </div>
  )
}
