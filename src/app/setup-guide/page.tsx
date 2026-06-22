"use client"

import { Badge } from "@/components/ui/badge"
import { Coffee, Globe, Server, ShoppingCart, Palette, FileText } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function SetupGuidePage() {
  const { t } = useI18n()

  const STEPS = [
    {
      icon: Server,
      title: t("setup_guide.step_1_title"),
      items: [
        t("setup_guide.step_1_1"),
        t("setup_guide.step_1_2"),
        t("setup_guide.step_1_3"),
        t("setup_guide.step_1_4"),
      ],
    },
    {
      icon: Coffee,
      title: t("setup_guide.step_2_title"),
      items: [
        t("setup_guide.step_2_1"),
        t("setup_guide.step_2_2"),
        t("setup_guide.step_2_3"),
        t("setup_guide.step_2_4"),
      ],
    },
    {
      icon: Palette,
      title: t("setup_guide.step_3_title"),
      items: [
        t("setup_guide.step_3_1"),
        t("setup_guide.step_3_2"),
        t("setup_guide.step_3_3"),
        "Edit gambar produk di folder public/",
      ],
    },
    {
      icon: ShoppingCart,
      title: t("setup_guide.step_4_title"),
      items: [
        t("setup_guide.step_4_1"),
        t("setup_guide.step_4_2"),
        t("setup_guide.step_4_3"),
      ],
    },
    {
      icon: Globe,
      title: t("setup_guide.step_5_title"),
      items: [
        t("setup_guide.step_5_1"),
        "Install Vercel CLI: npm i -g vercel",
        t("setup_guide.step_5_2"),
        t("setup_guide.step_5_3"),
        t("setup_guide.step_5_4"),
      ],
    },
    {
      icon: FileText,
      title: t("setup_guide.step_6_title"),
      items: [
        t("setup_guide.step_6_1"),
        t("setup_guide.step_6_2"),
        t("setup_guide.step_6_3"),
        t("setup_guide.step_6_4"),
      ],
    },
  ]

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center mb-12">
          <Badge variant="olive" className="mb-4">{t("setup_guide.title")}</Badge>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink">
            {t("setup_guide.title")}
          </h1>
          <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto">
            {t("setup_guide.desc")}
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
            {t("setup_guide.bantuan")} <span className="text-brick">@kopi_nusantara</span>
          </p>
        </div>
      </div>
    </div>
  )
}
