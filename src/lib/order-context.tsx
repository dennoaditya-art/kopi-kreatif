"use client"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  date: string
  customer: string
  items: OrderItem[]
  total: number
  shipping: number
  status: "Diproses" | "Dikirim" | "Selesai" | "Dibatalkan"
  shippingMethod: string
  paymentMethod: string
  address: string
  trackingNumber?: string
  estimasi: string
}

interface OrderContextValue {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "date">) => string
  getOrder: (id: string) => Order | undefined
}

function generateId() {
  const now = new Date()
  return `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
}

function formatDate() {
  return new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

const defaultOrders: Order[] = [
  { id: "INV-20260618-001", date: "18 Jun 2026", customer: "Rina Wijaya", items: [{ id: "arabika-gayo", productName: "Arabika Gayo", quantity: 2, price: 55000, image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=100&h=100&fit=crop" }], total: 110000, shipping: 12000, status: "Selesai", shippingMethod: "Reguler", paymentMethod: "Transfer BCA", address: "Jl. Merdeka No. 10, Jakarta", trackingNumber: "JNE123456789", estimasi: "3-5 hari" },
  { id: "INV-20260617-002", date: "17 Jun 2026", customer: "Bambang S.", items: [{ id: "robusta-temanggung", productName: "Robusta Temanggung", quantity: 4, price: 38000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop" }], total: 152000, shipping: 0, status: "Dikirim", shippingMethod: "Express", paymentMethod: "GoPay", address: "Jl. Braga No. 25, Bandung", trackingNumber: "JNE987654321", estimasi: "1-2 hari" },
  { id: "INV-20260617-003", date: "17 Jun 2026", customer: "Dian Permata", items: [{ id: "blend-kreasi", productName: "Blend Kreasi", quantity: 2, price: 49000, image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=100&h=100&fit=crop" }], total: 98000, shipping: 12000, status: "Diproses", shippingMethod: "Reguler", paymentMethod: "COD", address: "Jl. Manyar No. 5, Surabaya", estimasi: "3-5 hari" },
  { id: "INV-20260616-004", date: "16 Jun 2026", customer: "Arief Pratama", items: [{ id: "cold-brew-pack", productName: "Cold Brew Pack", quantity: 1, price: 48000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop" }], total: 48000, shipping: 12000, status: "Selesai", shippingMethod: "Reguler", paymentMethod: "Transfer Mandiri", address: "Jl. Malioboro No. 15, Yogyakarta", trackingNumber: "JNE456789123", estimasi: "3-5 hari" },
]

const ORDERS_KEY = "kopi-orders"

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useLocalStorage<Order[]>(ORDERS_KEY, defaultOrders)

  const addOrder = useCallback((data: Omit<Order, "id" | "date">) => {
    const id = generateId()
    const date = formatDate()
    setOrders((prev) => [{ id, date, ...data }, ...prev])
    return id
  }, [setOrders])

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders])

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used within OrderProvider")
  return ctx
}
