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

export const blogPosts: BlogPost[] = [
  {
    slug: "cara-menyeduh-kopi-enak",
    title: "Cara Menyeduh Kopi Enak di Rumah Ala Barista",
    excerpt: "Gak perlu mesin mahal. Dengan alat sederhana, kamu bisa bikin kopi seenak kafe favorit.",
    content: "Banyak orang berpikir bikin kopi enak di rumah itu susah dan butuh alat mahal. Padahal, dengan beberapa alat dasar dan teknik yang tepat, kamu bisa menyeduh kopi yang gak kalah sama kafe. Pertama, pastikan biji kopi yang kamu pakai masih segar. Kopi yang sudah digiling lebih dari 2 minggu akan kehilangan banyak aromanya. Kedua, perhatikan rasio air dan kopi. Untuk metode manual brew seperti V60 atau French Press, rasio idealnya adalah 1:15 sampai 1:17. Artinya, untuk 15 gram kopi, kamu perlu 225-255 ml air. Ketiga, suhu air juga penting. Jangan pakai air mendidih (100°C) — diamkan 30 detik setelah mendidih hingga suhu turun ke sekitar 90-96°C. Keempat, pastikan gilingan kopi sesuai dengan metode seduh. Untuk V60, gilingan medium-fine seperti gula pasir. French Press butuh gilingan kasar seperti garam kasar. Dengan konsistensi dan eksperimen, kamu bakal nemu rasa favoritmu sendiri.",
    author: "Tim Kopi Nusantara",
    date: "15 Juni 2026",
    readTime: "4 menit",
    category: "Tips & Trik",
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
  },
]
