"use client"

import { createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from "react"

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
const EMPTY_CART: CartItem[] = []

let listeners: (() => void)[] = []
let cachedSnapshot: CartItem[] = EMPTY_CART
let lastJson = ""

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === lastJson) return cachedSnapshot
    lastJson = saved ?? ""
    cachedSnapshot = saved ? JSON.parse(saved) : EMPTY_CART
    return cachedSnapshot
  } catch {
    return EMPTY_CART
  }
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART
}

function emitChange() {
  listeners.forEach((l) => l())
}

function saveItems(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
  emitChange()
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
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
  }, [])

  const updateQuantity = useCallback((key: string, delta: number) => {
    const current = getSnapshot()
    saveItems(
      current.map((item) =>
        itemKey(item.id, item.grind) === key
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    const current = getSnapshot()
    saveItems(current.filter((item) => itemKey(item.id, item.grind) !== key))
  }, [])

  const clearCart = useCallback(() => {
    saveItems(EMPTY_CART)
  }, [])

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
