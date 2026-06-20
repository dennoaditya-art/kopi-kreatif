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
    accessCode: "admin123",
  },
} as const

export const Z_INDEX = {
  navbar: 50,
  modal: 60,
  grain: 70,
} as const
