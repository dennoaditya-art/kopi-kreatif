export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
}

export const blogPostsId: BlogPost[] = [
  {
    slug: "cara-menyeduh-kopi-enak",
    title: "Cara Menyeduh Kopi Enak di Rumah Ala Barista",
    excerpt: "Gak perlu mesin mahal. Dengan alat sederhana, kamu bisa bikin kopi seenak kafe favorit.",
    content: "Banyak orang berpikir bikin kopi enak di rumah itu susah dan butuh alat mahal. Padahal, dengan beberapa alat dasar dan teknik yang tepat, kamu bisa menyeduh kopi yang gak kalah sama kafe. Pertama, pastikan biji kopi yang kamu pakai masih segar. Kopi yang sudah digiling lebih dari 2 minggu akan kehilangan banyak aromanya. Kedua, perhatikan rasio air dan kopi. Untuk metode manual brew seperti V60 atau French Press, rasio idealnya adalah 1:15 sampai 1:17. Artinya, untuk 15 gram kopi, kamu perlu 225-255 ml air. Ketiga, suhu air juga penting. Jangan pakai air mendidih (100°C) — diamkan 30 detik setelah mendidih hingga suhu turun ke sekitar 90-96°C. Keempat, pastikan gilingan kopi sesuai dengan metode seduh. Untuk V60, gilingan medium-fine seperti gula pasir. French Press butuh gilingan kasar seperti garam kasar. Dengan konsistensi dan eksperimen, kamu bakal nemu rasa favoritmu sendiri.",
    author: "Tim Kopi Nusantara",
    date: "15 Juni 2026",
    readTime: "4 menit",
    category: "Tips & Trik",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop",
  },
  {
    slug: "jenis-kopi-nusantara",
    title: "Mengenal 5 Jenis Kopi Nusantara yang Mendunia",
    excerpt: "Dari Gayo sampai Toraja, kopi Indonesia diakui sebagai salah satu terbaik di dunia.",
    content: "Indonesia adalah salah satu penghasil kopi terbesar di dunia, dan setiap daerah punya karakter rasa yang unik. Kopi Gayo dari Aceh dikenal dengan body-nya yang berat, acidity rendah, dan aftertaste manis seperti cokelat. Cocok buat kamu yang suka kopi bold. Kopi Toraja dari Sulawesi punya rasa kompleks — campuran buah, rempah, dan herbal dengan acidity yang bright. Ini favorit para pecinta kopi specialty. Kopi Java dari Jawa Timur punya rasa klasik yang smooth, earthy, dengan acidity rendah. Pilihan pas buat minum kopi setiap hari. Kopi Bali Kintamani unik karena punya aroma jeruk dan buah segar berkat metode natural process. Kopi Flores dari NTT punya rasa rempah yang hangat dengan body sedang. Masing-masing punya cerita dan karakter yang bikin kopi Indonesia istimewa di mata dunia.",
    author: "Tim Kopi Nusantara",
    date: "8 Juni 2026",
    readTime: "5 menit",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&h=450&fit=crop",
  },
  {
    slug: "perbedaan-roast-level",
    title: "Light vs Medium vs Dark Roast: Mana yang Cocok?",
    excerpt: "Panduan memilih tingkat roasting yang sesuai dengan selera kopi kamu.",
    content: "Tingkat roasting adalah salah satu faktor terbesar yang menentukan rasa kopi. Light roast dipanggang pada suhu 180-205°C, mempertahankan sebagian besar asam organik dan karakter asli biji. Hasilnya: acidity tinggi, rasa fruity dan floral, body ringan. Cocok untuk manual brew seperti V60 atau AeroPress. Medium roast berada di kisaran 210-220°C. Rasa lebih seimbang — acidity dan body-nya pas, dengan aroma karamel ringan. Ini roasting paling populer untuk sehari-hari, cocok untuk hampir semua metode seduh. Dark roast mencapai 225-240°C. Minyak mulai muncul di permukaan biji, rasa jadi lebih bold, pahit, dan smoky. Body-nya berat, acidity rendah. Paling cocok untuk espresso dan susu. Tips: makin gelap roasting-nya, makin sedikit kafeinnya (banyak orang salah sangka). Light roast justru punya kafein lebih tinggi karena biji lebih padat. Coba ketiganya dan temukan favoritmu!",
    author: "Tim Kopi Nusantara",
    date: "1 Juni 2026",
    readTime: "4 menit",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=450&fit=crop",
  },
  {
    slug: "kopi-untuk-kesehatan",
    title: "Manfaat Kopi untuk Kesehatan yang Jarang Diketahui",
    excerpt: "Lebih dari sekadar penambah energi, kopi punya segudang manfaat buat tubuh.",
    content: "Kopi bukan cuma bikin melek dan semangat. Penelitian terbaru menunjukkan kopi punya banyak manfaat kesehatan yang menarik. Kopi kaya akan antioksidan — bahkan sumber antioksidan nomor satu dalam diet orang Barat, mengalahkan buah dan sayur. Antioksidan ini membantu melawan radikal bebas dan peradangan dalam tubuh. Konsumsi kopi secara rutin (2-3 cangkir per hari) dikaitkan dengan penurunan risiko penyakit jantung, diabetes tipe 2, dan beberapa jenis kanker. Kafein dalam kopi juga meningkatkan fungsi otak — memperbaiki mood, waktu reaksi, memori, dan kewaspadaan mental. Kopi juga membantu metabolisme dan pembakaran lemak, makanya sering ada di suplemen pembakar lemak. Tapi ingat: manfaat ini berlaku untuk kopi hitam tanpa gula dan susu berlebihan. Kopi kekinian dengan gula dan krim justru bisa berdampak sebaliknya. Jadi nikmati kopi hitammu, dan rasakan manfaatnya!",
    author: "Tim Kopi Nusantara",
    date: "25 Mei 2026",
    readTime: "5 menit",
    category: "Kesehatan",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=450&fit=crop",
  },
]

export const blogPostsEn: BlogPost[] = [
  {
    slug: "cara-menyeduh-kopi-enak",
    title: "How to Brew Great Coffee at Home Like a Barista",
    excerpt: "No need for expensive machines. With simple tools, you can make coffee as good as your favorite cafe.",
    content: "Many people think making great coffee at home is difficult and requires expensive tools. But with basic equipment and the right technique, you can brew coffee that's just as good as your local cafe.\n\nFirst, make sure your coffee beans are still fresh. Coffee that has been ground for more than 2 weeks loses most of its aroma. Second, pay attention to the water-to-coffee ratio. For manual brewing methods like V60 or French Press, the ideal ratio is 1:15 to 1:17. That means for 15 grams of coffee, you need 225-255 ml of water.\n\nThird, water temperature matters too. Don't use boiling water (100°C) — let it sit for 30 seconds after boiling until it drops to around 90-96°C. Fourth, make sure your grind size matches your brewing method. For V60, use medium-fine grind like granulated sugar. French Press needs coarse grind like sea salt.\n\nWith consistency and experimentation, you'll find your own favorite flavor.",
    author: "Kopi Nusantara Team",
    date: "June 15, 2026",
    readTime: "4 min read",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop",
  },
  {
    slug: "jenis-kopi-nusantara",
    title: "5 World-Renowned Nusantara Coffee Types You Should Know",
    excerpt: "From Gayo to Toraja, Indonesian coffee is recognized as one of the best in the world.",
    content: "Indonesia is one of the largest coffee producers in the world, and each region has a unique flavor character. Gayo Coffee from Aceh is known for its heavy body, low acidity, and sweet chocolate aftertaste. Perfect for those who love bold coffee.\n\nToraja Coffee from Sulawesi has a complex flavor — a blend of fruit, spice, and herbal notes with bright acidity. This is a favorite among specialty coffee enthusiasts. Java Coffee from East Java has a classic smooth, earthy taste with low acidity. A great choice for everyday drinking.\n\nBali Kintamani Coffee is unique with its citrus and fresh fruit aroma thanks to the natural process method. Flores Coffee from NTT has warm spicy notes with a medium body. Each one has a story and character that makes Indonesian coffee special in the eyes of the world.",
    author: "Kopi Nusantara Team",
    date: "June 8, 2026",
    readTime: "5 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&h=450&fit=crop",
  },
  {
    slug: "perbedaan-roast-level",
    title: "Light vs Medium vs Dark Roast: Which One Suits You?",
    excerpt: "A guide to choosing the right roast level for your coffee taste.",
    content: "Roast level is one of the biggest factors determining coffee flavor. Light roast is roasted at 180-205°C, preserving most of the organic acids and the bean's original character. The result: high acidity, fruity and floral notes, light body. Great for manual brewing like V60 or AeroPress.\n\nMedium roast ranges from 210-220°C. The flavor is more balanced — acidity and body are just right, with a hint of caramel aroma. This is the most popular roast for daily drinking, suitable for almost all brewing methods.\n\nDark roast reaches 225-240°C. Oils begin to appear on the bean surface, resulting in a bolder, more bitter, and smoky flavor. Heavy body, low acidity. Best suited for espresso and milk-based drinks.\n\nTip: the darker the roast, the less caffeine it contains (many people get this wrong). Light roast actually has more caffeine because the beans are denser. Try all three and find your favorite!",
    author: "Kopi Nusantara Team",
    date: "June 1, 2026",
    readTime: "4 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=450&fit=crop",
  },
  {
    slug: "kopi-untuk-kesehatan",
    title: "Lesser-Known Health Benefits of Coffee",
    excerpt: "More than just an energy booster, coffee has a wealth of benefits for your body.",
    content: "Coffee isn't just about waking you up and keeping you going. Recent research shows coffee has many surprising health benefits. Coffee is rich in antioxidants — in fact, it's the number one source of antioxidants in the Western diet, beating fruits and vegetables. These antioxidants help fight free radicals and inflammation in the body.\n\nRegular coffee consumption (2-3 cups per day) is linked to a reduced risk of heart disease, type 2 diabetes, and several types of cancer. The caffeine in coffee also improves brain function — boosting mood, reaction time, memory, and mental alertness.\n\nCoffee also helps metabolism and fat burning, which is why it's often found in weight loss supplements. But remember: these benefits apply to black coffee without excessive sugar and cream. Trendy coffee drinks with sugar and cream can actually have the opposite effect.\n\nSo enjoy your black coffee and feel the benefits!",
    author: "Kopi Nusantara Team",
    date: "May 25, 2026",
    readTime: "5 min read",
    category: "Health",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=450&fit=crop",
  },
]

export function getBlogPosts(locale: string): BlogPost[] {
  return locale === "en" ? blogPostsEn : blogPostsId
}

export function getBlogPost(slug: string, locale: string): BlogPost | undefined {
  const posts = getBlogPosts(locale)
  return posts.find((p) => p.slug === slug)
}
