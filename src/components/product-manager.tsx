"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { products, type Product } from "@/lib/coffee-data"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, Pencil, Trash2, Search } from "lucide-react"
import Image from "next/image"

const STORAGE_KEY = "kopi-products"

function loadProducts(): Product[] {
  if (typeof window === "undefined") return products
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as Product[]
  } catch {}
  return products
}

function saveProducts(list: Product[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch {}
}

const emptyProduct = (): Product => ({
  id: "", name: "", tagline: "", description: "", price: 0, weight: "200g",
  roastLevel: "Medium", origin: "", flavorNotes: [], grind: ["V60"],
  rating: 4.5, reviewCount: 0, stock: 10, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=450&fit=crop",
  category: "single-origin",
})

export function ProductManager() {
  const [localProducts, setLocalProducts] = useState<Product[]>(loadProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState<Product>(emptyProduct())
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    saveProducts(localProducts)
  }, [localProducts])

  const filtered = localProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function openAdd() {
    setEditForm(emptyProduct())
    setEditing(null)
    setShowModal(true)
  }

  function openEdit(product: Product) {
    setEditForm({ ...product })
    setEditing(product)
    setShowModal(true)
  }

  function save() {
    if (editing) {
      setLocalProducts((prev) => prev.map((p) => p.id === editing.id ? editForm : p))
    } else {
      setLocalProducts((prev) => [...prev, { ...editForm, id: `product-${Date.now()}`, reviewCount: 0, rating: 4.5 }])
    }
    setShowModal(false)
    setEditing(null)
  }

  function remove(id: string) {
    if (window.confirm("Hapus produk ini?")) {
      setLocalProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!showModal) return
    if (e.key === "Escape") {
      setShowModal(false)
      return
    }
    if (e.key !== "Tab" || !modalRef.current) return
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [showModal])

  useEffect(() => {
    if (showModal) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.addEventListener("keydown", handleKeyDown)
      requestAnimationFrame(() => {
        const first = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        first?.focus()
      })
    } else {
      previousActiveElement.current?.focus()
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [showModal, handleKeyDown])

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("katalog.search_placeholder")}
            className="pl-9 h-10 text-sm"
          />
        </div>
        <Button size="sm" className="gap-1.5 text-xs rounded-xl bg-gradient-to-b from-plum to-plum-medium text-white border-0" onClick={openAdd}>
          <Plus size={14} /> {t("dashboard.produk_baru")}
        </Button>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-sm text-ink-muted">{t("katalog.tidak_ditemukan")}</div>
        ) : (
          filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink/[0.03] dark:hover:bg-white/[0.03] transition-colors group"
            >
              <div className="h-10 w-10 shrink-0 relative rounded-lg overflow-hidden bg-paper-alt ring-1 ring-ink/10">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{product.name}</p>
                <p className="text-[11px] text-ink-muted">{product.origin} &bull; Rp{product.price.toLocaleString("id-ID")} &bull; Stok: {product.stock}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(product)} className="h-8 w-8 rounded-lg bg-brick/10 text-brick flex items-center justify-center hover:bg-brick/20 transition-colors" aria-label="Edit">
                  <Pencil size={13} />
                </button>
                <button onClick={() => remove(product.id)} className="h-8 w-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors" aria-label="Delete">
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={editing ? "Edit Produk" : "Produk Baru"}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-[24px] border-2 border-ink w-full max-w-lg max-h-[85vh] overflow-y-auto card-shadow-hard"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-ink">
                <h3 className="font-black text-lg">{editing ? "Edit Produk" : "Produk Baru"}</h3>
                <button onClick={() => setShowModal(false)} className="h-9 w-9 rounded-xl border-2 border-ink flex items-center justify-center" aria-label="Tutup">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-name">Nama Produk</label>
                    <Input id="pm-name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-price">Harga (Rp)</label>
                    <Input id="pm-price" type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-stock">Stok</label>
                    <Input id="pm-stock" type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-weight">Berat</label>
                    <Input id="pm-weight" value={editForm.weight} onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-roast">Roast Level</label>
                    <Input id="pm-roast" value={editForm.roastLevel} onChange={(e) => setEditForm({ ...editForm, roastLevel: e.target.value })} className="h-10 text-sm" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-origin">Origin</label>
                    <Input id="pm-origin" value={editForm.origin} onChange={(e) => setEditForm({ ...editForm, origin: e.target.value })} className="h-10 text-sm" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-category">Kategori</label>
                    <select id="pm-category" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full h-10 rounded-[12px] border-2 border-ink bg-card text-sm px-3 font-medium text-ink">
                      <option value="single-origin">Single Origin</option>
                      <option value="blend">Blend</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-ink-muted" htmlFor="pm-image">Image URL</label>
                    <Input id="pm-image" value={editForm.image} onChange={(e) => setEditForm({ ...editForm, image: e.target.value })} className="h-10 text-sm" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-5 border-t-2 border-ink">
                <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>{t("umum.batal")}</Button>
                <Button className="flex-1 gap-2" onClick={save}><Plus size={16} />{editing ? "Simpan" : "Tambah Produk"}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
