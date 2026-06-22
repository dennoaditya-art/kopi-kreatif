"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageOff } from "lucide-react"

interface ProductImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: ProductImageProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-ink/5 text-ink-muted",
          fill ? "absolute inset-0" : "",
          className
        )}
      >
        <div className="flex flex-col items-center gap-1">
          <ImageOff size={20} />
          <span className="text-[10px] font-medium">Gambar tidak tersedia</span>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn("object-cover", className)}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
