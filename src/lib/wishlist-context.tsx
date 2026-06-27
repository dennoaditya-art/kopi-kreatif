"use client"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  weight: string
  category: string
}

interface WishlistContextValue {
  items: WishlistItem[]
  toggleItem: (item: WishlistItem) => void
  isWishlisted: (id: string) => boolean
  removeItem: (id: string) => void
  count: number
}

const WISHLIST_KEY = "kopi-wishlist"
const EMPTY_WISHLIST: WishlistItem[] = []

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<WishlistItem[]>(WISHLIST_KEY, EMPTY_WISHLIST)

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((current) => {
      const exists = current.some((i) => i.id === item.id)
      if (exists) return current.filter((i) => i.id !== item.id)
      return [...current, item]
    })
  }, [setItems])

  const isWishlisted = useCallback((id: string) => {
    return items.some((i) => i.id === id)
  }, [items])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((i) => i.id !== id))
  }, [setItems])

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted, removeItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
