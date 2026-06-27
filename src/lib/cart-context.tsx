"use client"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

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

const CART_KEY = "kopi-cart"
const EMPTY_CART: CartItem[] = []

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_KEY, EMPTY_CART)

  const addItem = useCallback((newItem: CartItem) => {
    setItems((current) => {
      const key = itemKey(newItem.id, newItem.grind)
      const existing = current.find((i) => itemKey(i.id, i.grind) === key)
      if (existing) {
        return current.map((i) =>
          itemKey(i.id, i.grind) === key
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }
      return [...current, newItem]
    })
  }, [setItems])

  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        itemKey(item.id, item.grind) === key
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }, [setItems])

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => itemKey(item.id, item.grind) !== key))
  }, [setItems])

  const clearCart = useCallback(() => {
    setItems(EMPTY_CART)
  }, [setItems])

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
