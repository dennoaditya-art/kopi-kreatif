import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Kebijakan Privasi — KOPI Nusantara",
  description: "Kebijakan privasi KOPI Nusantara. Bagaimana kami mengelola dan melindungi data pribadi Anda.",
}

export default function PrivasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Beranda
      </Link>
      <div className="bg-card rounded-[16px] border-2 border-ink p-6 sm:p-8 card-shadow-hard">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-brick/10 text-brick flex items-center justify-center">
            <Shield size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Kebijakan Privasi</h1>
        </div>
        <div className="space-y-5 text-sm text-ink/80 leading-relaxed">
          <p>Terakhir diperbarui: 18 Juni 2026</p>
          <h2 className="font-bold text-base text-ink">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk: nama lengkap, alamat email, nomor telepon, alamat pengiriman, dan informasi pembayaran yang diperlukan untuk memproses pesanan.</p>
          <h2 className="font-bold text-base text-ink">2. Penggunaan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk: memproses dan mengirim pesanan Anda, memberikan dukungan pelanggan, mengirimkan informasi promo (dengan persetujuan Anda), dan meningkatkan kualitas layanan kami.</p>
          <h2 className="font-bold text-base text-ink">3. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.</p>
          <h2 className="font-bold text-base text-ink">4. Cookie</h2>
          <p>Kami menggunakan cookie untuk meningkatkan pengalaman berbelanja Anda. Cookie membantu kami mengingat preferensi Anda dan memahami bagaimana Anda menggunakan situs kami.</p>
          <h2 className="font-bold text-base text-ink">5. Hak Anda</h2>
          <p>Anda berhak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda kapan saja. Hubungi kami melalui halaman Kontak untuk melakukan perubahan.</p>
          <h2 className="font-bold text-base text-ink">6. Perubahan Kebijakan</h2>
          <p>Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Kami akan memberitahukan perubahan signifikan melalui email atau pengumuman di situs kami.</p>
          <h2 className="font-bold text-base text-ink">Kontak</h2>
          <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di <strong className="text-ink">support@kopi-nusantara.id</strong></p>
        </div>
      </div>
    </div>
  )
}
