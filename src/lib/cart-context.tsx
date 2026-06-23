"use client"

import { createContext, useContext, useCallback, useRef, useSyncExternalStore, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  grind: string
  weight: string
  image: string
}

export function itemKey(id: string, grind: string) {
  return `${id}::${grind}`
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (key: string, delta: number) => void
  removeItem: (key: string) => void
  clearCart: () => void
  subtotal: number
  totalItems: number
}

const STORAGE_KEY = "kopi-cart"

const CartContext = createContext<CartContextValue | null>(null)

const EMPTY_CART: CartItem[] = []

export function CartProvider({ children }: { children: ReactNode }) {
  const listenersRef = useRef<(() => void)[]>([])
  const cachedRef = useRef<CartItem[]>([])
  const lastJsonRef = useRef<string | null>(null)

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.push(listener)
    return () => {
      listenersRef.current = listenersRef.current.filter((l) => l !== listener)
    }
  }, [])

  const getSnapshot = useCallback((): CartItem[] => {
    if (typeof window === "undefined") return EMPTY_CART
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === lastJsonRef.current) return cachedRef.current
      lastJsonRef.current = saved
      cachedRef.current = saved ? JSON.parse(saved) : EMPTY_CART
      return cachedRef.current
    } catch {
      return EMPTY_CART
    }
  }, [])

  const getServerSnapshot = useCallback((): CartItem[] => EMPTY_CART, [])

  const emitChange = useCallback(() => {
    listenersRef.current.forEach((l) => l())
  }, [])

  const saveItems = useCallback((items: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
    emitChange()
  }, [emitChange])

  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const addItem = useCallback((newItem: CartItem) => {
    const current = getSnapshot()
    const key = itemKey(newItem.id, newItem.grind)
    const existing = current.find((i) => itemKey(i.id, i.grind) === key)
    if (existing) {
      saveItems(
        current.map((i) =>
          itemKey(i.id, i.grind) === key
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      )
    } else {
      saveItems([...current, newItem])
    }
  }, [getSnapshot, saveItems])

  const updateQuantity = useCallback((key: string, delta: number) => {
    const current = getSnapshot()
    saveItems(
      current.map((item) =>
        itemKey(item.id, item.grind) === key
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }, [getSnapshot, saveItems])

  const removeItem = useCallback((key: string) => {
    const current = getSnapshot()
    saveItems(current.filter((item) => itemKey(item.id, item.grind) !== key))
  }, [getSnapshot, saveItems])

  const clearCart = useCallback(() => {
    saveItems([])
  }, [saveItems])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
