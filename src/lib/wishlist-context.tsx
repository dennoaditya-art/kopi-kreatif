"use client"

import { createContext, useContext, useCallback, useRef, useSyncExternalStore, type ReactNode } from "react"

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

const STORAGE_KEY = "kopi-wishlist"

const WishlistContext = createContext<WishlistContextValue | null>(null)

const EMPTY_WISHLIST: WishlistItem[] = []

export function WishlistProvider({ children }: { children: ReactNode }) {
  const listenersRef = useRef<(() => void)[]>([])
  const cachedRef = useRef<WishlistItem[]>([])
  const lastJsonRef = useRef<string | null>(null)

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.push(listener)
    return () => {
      listenersRef.current = listenersRef.current.filter((l) => l !== listener)
    }
  }, [])

  const getSnapshot = useCallback((): WishlistItem[] => {
    if (typeof window === "undefined") return EMPTY_WISHLIST
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === lastJsonRef.current) return cachedRef.current
      lastJsonRef.current = saved
      cachedRef.current = saved ? JSON.parse(saved) : EMPTY_WISHLIST
      return cachedRef.current
    } catch { return EMPTY_WISHLIST }
  }, [])

  const getServerSnapshot = useCallback((): WishlistItem[] => EMPTY_WISHLIST, [])

  const emitChange = useCallback(() => {
    listenersRef.current.forEach((l) => l())
  }, [])

  const saveItems = useCallback((items: WishlistItem[]) => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    emitChange()
  }, [emitChange])

  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleItem = useCallback((item: WishlistItem) => {
    const current = getSnapshot()
    const exists = current.some((i) => i.id === item.id)
    if (exists) saveItems(current.filter((i) => i.id !== item.id))
    else saveItems([...current, item])
  }, [getSnapshot, saveItems])

  const isWishlisted = useCallback((id: string) => getSnapshot().some((i) => i.id === id), [getSnapshot])

  const removeItem = useCallback((id: string) => {
    saveItems(getSnapshot().filter((i) => i.id !== id))
  }, [getSnapshot, saveItems])

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
