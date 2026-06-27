export const SITE_CONFIG = {
  name: "KOPI",
  tagline: "Bubuk Kopi Nusantara Premium",
  description: "Menghadirkan cita rasa kopi Nusantara terbaik langsung ke pintu Anda.",
  url: "https://kopi-nusantara.com",
  locale: "id_ID",
  social: {
    instagram: "@kopi_nusantara",
    tiktok: "@kopi_nusantara",
  },
  shipping: {
    freeThreshold: 100000,
    standardFee: 12000,
  },
  dashboard: {
    accessCode: "", // now validated server-side via /api/auth
  },
} as const

