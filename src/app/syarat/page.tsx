import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — KOPI Nusantara",
  description: "Syarat dan ketentuan penggunaan situs KOPI Nusantara.",
}

export default function SyaratPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Beranda
      </Link>
      <div className="bg-card rounded-[16px] border-2 border-ink p-6 sm:p-8 card-shadow-hard">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-brick/10 text-brick flex items-center justify-center">
            <FileText size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Syarat & Ketentuan</h1>
        </div>
        <div className="space-y-5 text-sm text-ink/80 leading-relaxed">
          <p>Terakhir diperbarui: 18 Juni 2026</p>
          <h2 className="font-bold text-base text-ink">1. Ketentuan Umum</h2>
          <p>Dengan mengakses dan menggunakan situs KOPI Nusantara, Anda menyetujui syarat dan ketentuan yang berlaku. Jika Anda tidak setuju dengan sebagian atau seluruh syarat, mohon tidak menggunakan layanan kami.</p>
          <h2 className="font-bold text-base text-ink">2. Produk & Harga</h2>
          <p>Seluruh produk yang ditampilkan tersedia selama stok masih ada. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Kami berhak menolak atau membatalkan pesanan jika terjadi kesalahan harga atau informasi produk.</p>
          <h2 className="font-bold text-base text-ink">3. Pemesanan & Pembayaran</h2>
          <p>Pesanan dianggap sah setelah pembayaran berhasil dikonfirmasi. Pembayaran dapat dilakukan melalui metode yang tersedia di halaman checkout. Pesanan akan diproses setelah konfirmasi pembayaran diterima.</p>
          <h2 className="font-bold text-base text-ink">4. Pengiriman</h2>
          <p>Waktu pengiriman adalah estimasi dan dapat berbeda tergantung lokasi dan kebijakan jasa kirim. KOPI Nusantara tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak jasa kirim atau force majeure.</p>
          <h2 className="font-bold text-base text-ink">5. Retur & Refund</h2>
          <p>Produk yang belum dibuka dapat diretur dalam waktu 7 hari setelah diterima. Biaya retur ditanggung oleh pembeli kecuali ada kesalahan dari pihak kami. Refund akan diproses dalam 3-5 hari kerja setelah produk diterima kembali.</p>
          <h2 className="font-bold text-base text-ink">6. Kekayaan Intelektual</h2>
          <p>Seluruh konten di situs ini, termasuk teks, gambar, logo, dan desain, adalah milik KOPI Nusantara dan dilindungi oleh hak cipta yang berlaku.</p>
          <h2 className="font-bold text-base text-ink">7. Perubahan Ketentuan</h2>
          <p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui situs kami.</p>
        </div>
      </div>
    </div>
  )
}
