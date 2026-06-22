"use client"

import { useI18n } from "./context"

export function T({ k }: { k: string }) {
  return <>{useI18n().t(k)}</>
}
