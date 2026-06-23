export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice?: number
  weight: string
  roastLevel: string
  origin: string
  flavorNotes: string[]
  grind: string[]
  rating: number
  reviewCount: number
  stock: number
  image: string
  badge?: string
  category: string
}

export const products: Product[] = [
  {
    id: "espresso-blend",
    name: "Espresso Blend",
    tagline: "Bold & Berani",
    description: "Perpaduan arabika dan robusta dari Sumatera dan Jawa. Medium-dark roast menghasilkan crema sempurna dengan body tebal dan aftertaste cokelat hitam.",
    price: 45000,
    weight: "200g",
    roastLevel: "Medium-Dark",
    origin: "Sumatera, Jawa",
    flavorNotes: ["Cokelat Hitam", "Karamel", "Rempah"],
    grind: ["Espresso", "French Press"],
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=450&fit=crop",
    badge: "Best Seller",
    category: "single-origin"
  },
  {
    id: "arabika-gayo",
    name: "Arabika Gayo",
    tagline: "Smooth & Fruity",
    description: "Arabika premium dari dataran tinggi Gayo, Aceh. Acidity rendah, body creamy, aroma herbal kompleks yang khas.",
    price: 55000,
    originalPrice: 65000,
    weight: "250g",
    roastLevel: "Light-Medium",
    origin: "Aceh, Gayo",
    flavorNotes: ["Jeruk", "Cokelat Susu", "Herbal"],
    grind: ["V60", "Pour Over", "Aeropress"],
    rating: 4.9,
    reviewCount: 89,
    stock: 35,
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=450&fit=crop",
    badge: "Diskon",
    category: "single-origin"
  },
  {
    id: "robusta-temanggung",
    name: "Robusta Temanggung",
    tagline: "Kuat & Mantap",
    description: "Robusta dari Temanggung dengan body sangat tebal, kafein tinggi, dan rasa earthy yang khas. Untuk yang butuh tenaga ekstra.",
    price: 38000,
    weight: "200g",
    roastLevel: "Dark",
    origin: "Temanggung, Jawa Tengah",
    flavorNotes: ["Kacang", "Kayu Manis", "Earthy"],
    grind: ["Tubruk", "French Press", "Espresso"],
    rating: 4.6,
    reviewCount: 67,
    stock: 70,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=450&fit=crop",
    category: "single-origin"
  },
  {
    id: "bali-kintamani",
    name: "Bali Kintamani",
    tagline: "Eksotis & Segar",
    description: "Arabika dari lereng Gunung Batur dengan sistem tumpang sari jeruk. Profil rasa citrus asam manis yang unik dan menyegarkan.",
    price: 52000,
    weight: "250g",
    roastLevel: "Light",
    origin: "Bali, Kintamani",
    flavorNotes: ["Lemon", "Jeruk Bali", "Gula Aren"],
    grind: ["V60", "Pour Over", "Cold Brew"],
    rating: 4.7,
    reviewCount: 52,
    stock: 25,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=450&fit=crop",
    badge: "Limited",
    category: "single-origin"
  },
  {
    id: "toraja-kalossi",
    name: "Toraja Kalossi",
    tagline: "Klasik & Berkarakter",
    description: "Arabika Toraja dengan karakter kompleks dan full body. Sentuhan buah tropis dan dark chocolate yang iconic.",
    price: 58000,
    weight: "250g",
    roastLevel: "Medium",
    origin: "Sulawesi, Toraja",
    flavorNotes: ["Buah Tropis", "Dark Chocolate", "Rempah"],
    grind: ["V60", "French Press", "Aeropress"],
    rating: 4.8,
    reviewCount: 93,
    stock: 40,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=450&fit=crop",
    category: "single-origin"
  },
  {
    id: "cold-brew-pack",
    name: "Cold Brew Pack",
    tagline: "Segar & Easy",
    description: "Special blend untuk cold brew. Coarse grind siap seduh dingin — tinggal rendam dan nikmati.",
    price: 48000,
    weight: "200g",
    roastLevel: "Medium",
    origin: "Blend Nusantara",
    flavorNotes: ["Kakao", "Kacang Almond", "Buah Merah"],
    grind: ["Cold Brew"],
    rating: 4.5,
    reviewCount: 41,
    stock: 60,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=450&fit=crop",
    badge: "New",
    category: "blend"
  },
  {
    id: "java-premium",
    name: "Java Premium",
    tagline: "Legacy & Elegan",
    description: "Arabika Java dengan profil klasik bersih. Aroma floral ringan dengan finish kayu manis dan rempah tradisional Jawa.",
    price: 62000,
    weight: "250g",
    roastLevel: "Light-Medium",
    origin: "Jawa Timur, Ijen",
    flavorNotes: ["Melati", "Kayu Manis", "Madu"],
    grind: ["V60", "Pour Over", "Aeropress"],
    rating: 4.7,
    reviewCount: 35,
    stock: 20,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=450&fit=crop",
    badge: "Premium",
    category: "single-origin"
  },
  {
    id: "blend-kreasi",
    name: "Blend Kreasi",
    tagline: "Unik & Berani",
    description: "Blend eksperimental dari Flores, Papua, dan Lampung. Profil rasa kompleks untuk petualang rasa sejati.",
    price: 49000,
    weight: "200g",
    roastLevel: "Medium-Dark",
    origin: "Flores, Papua, Lampung",
    flavorNotes: ["Buah Hitam", "Gula Bakar", "Tembakau"],
    grind: ["Espresso", "Tubruk", "French Press"],
    rating: 4.4,
    reviewCount: 28,
    stock: 45,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=450&fit=crop",
    category: "blend"
  }
]

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rina Wijaya",
    role: "Home Brewer, Jakarta",
    content: "Biji kopinya segar banget, aroma roasted masih terasa pas dibuka. Jadi ritual pagi yang nggak pernah saya lewatkan.",
    rating: 5
  },
  {
    id: "2",
    name: "Bambang Setiawan",
    role: "Kafe Owner, Bandung",
    content: "Enam bulan jadi supplier tetap. Konsistensi rasa dan kualitas roasting luar biasa — pelanggan pada puas.",
    rating: 5
  },
  {
    id: "3",
    name: "Dian Permata",
    role: "Coffee Enthusiast, Surabaya",
    content: "Blend Kreasi beneran unik! Baru pertama nyobain kopi dengan aftertaste tembakau. Mind-blowing.",
    rating: 4
  },
  {
    id: "4",
    name: "Arief Pratama",
    role: "Remote Worker, Yogyakarta",
    content: "Cold Brew Pack ini life saver. Tinggal masukin kulkas semalem, paginya tinggal minum. Praktis.",
    rating: 5
  },
  {
    id: "5",
    name: "Sari Dewi",
    role: "Barista, Malang",
    content: "Espresso Blend-nya perfect untuk base minuman signature kafe kami. Crema-nya rich banget!",
    rating: 5
  },
  {
    id: "6",
    name: "Hendra Kusuma",
    role: "Coffee Roaster, Bali",
    content: "Biji hijau yang dikirim konsisten grade-nya. Roasting profile-nya mudah ditebak, cocok buat specialty coffee.",
    rating: 4
  },
  {
    id: "7",
    name: "Fitri Handayani",
    role: "Ibu Rumah Tangga, Semarang",
    content: "Beli Arabika Gayo untuk stok lebaran. Semua tamu suka, katanya beda sama kopi biasa. Wanginya harum.",
    rating: 5
  },
  {
    id: "8",
    name: "Dimas Ardiansyah",
    role: "Mahasiswa, Bandung",
    content: "Cold Brew Pack jadi teman begadang skripsi. Tinggal seduh dingin, diemin semalem, tinggal minum. Praktis banget.",
    rating: 4
  }
]

export interface DashboardStat {
  label: string
  value: string
  change: string
  isPositive: boolean
}

export const dashboardStats: DashboardStat[] = [
  { label: "Total Pesanan", value: "1.247", change: "+12.5%", isPositive: true },
  { label: "Pendapatan", value: "Rp 89,2 Jt", change: "+18.3%", isPositive: true },
  { label: "Produk Terjual", value: "2.138", change: "+8.7%", isPositive: true },
  { label: "Pelanggan Baru", value: "342", change: "+24.1%", isPositive: true },
]

export const FLAVOR_COLORS: Record<string, string> = {
  "Cokelat Hitam": "bg-brick/10 text-ink border-brick/20",
  "Cokelat Susu": "bg-brick/10 text-ink border-brick/20",
  "Dark Chocolate": "bg-brick/10 text-ink border-brick/20",
  Karamel: "bg-brick/10 text-ink border-brick/20",
  Rempah: "bg-brick/10 text-brick border-brick/20",
  Jeruk: "bg-brick/10 text-ink border-brick/20",
  Kacang: "bg-brick/10 text-ink border-brick/20",
  "Kacang Almond": "bg-brick/10 text-ink border-brick/20",
  "Kayu Manis": "bg-brick/10 text-ink border-brick/20",
  Herbal: "bg-olive/10 text-olive border-olive/20",
  Earthy: "bg-ink/5 text-ink-muted border-ink/10",
  Lemon: "bg-brick/10 text-ink border-brick/20",
  "Jeruk Bali": "bg-brick/10 text-brick border-brick/20",
  "Gula Aren": "bg-brick/10 text-ink border-brick/20",
  "Gula Bakar": "bg-brick/10 text-ink border-brick/20",
  "Buah Tropis": "bg-olive/10 text-olive border-olive/20",
  "Buah Merah": "bg-brick/10 text-brick border-brick/20",
  "Buah Hitam": "bg-brick/10 text-brick border-brick/20",
  Kakao: "bg-brick/10 text-ink border-brick/20",
  Melati: "bg-olive/10 text-olive border-olive/20",
  Madu: "bg-brick/5 text-ink border-brick/10",
  Tembakau: "bg-brick/10 text-ink border-brick/20",
}

export const recentOrders = [
  { id: "#INV-001", customer: "Rina Wijaya", product: "Arabika Gayo", amount: 55000, status: "Selesai", date: "18 Jun 2026" },
  { id: "#INV-002", customer: "Bambang S.", product: "Robusta Temanggung", amount: 152000, status: "Dikirim", date: "17 Jun 2026" },
  { id: "#INV-003", customer: "Dian Permata", product: "Blend Kreasi", amount: 98000, status: "Diproses", date: "17 Jun 2026" },
  { id: "#INV-004", customer: "Arief Pratama", product: "Cold Brew Pack", amount: 48000, status: "Selesai", date: "16 Jun 2026" },
  { id: "#INV-005", customer: "Sari Dewi", product: "Toraja Kalossi", amount: 58000, status: "Dibatalkan", date: "15 Jun 2026" },
]
