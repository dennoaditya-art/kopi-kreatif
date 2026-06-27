import { useCallback, useRef, useSyncExternalStore } from "react"

type Listener = () => void

export function useLocalStorage<T>(key: string, fallback: T) {
  const listenersRef = useRef<Listener[]>([])
  const cachedRef = useRef<T>(fallback)
  const lastJsonRef = useRef<string | null>(null)

  const subscribe = useCallback((listener: Listener) => {
    listenersRef.current.push(listener)
    return () => {
      listenersRef.current = listenersRef.current.filter((l) => l !== listener)
    }
  }, [])

  const getSnapshot = useCallback((): T => {
    if (typeof window === "undefined") return fallback
    try {
      const saved = localStorage.getItem(key)
      if (saved === lastJsonRef.current) return cachedRef.current
      lastJsonRef.current = saved
      cachedRef.current = saved ? JSON.parse(saved) : fallback
      return cachedRef.current
    } catch {
      return fallback
    }
  }, [key, fallback])

  const getServerSnapshot = useCallback((): T => fallback, [fallback])

  const emitChange = useCallback(() => {
    listenersRef.current.forEach((l) => l())
  }, [])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const current = getSnapshot()
    const next = typeof value === "function" ? (value as (prev: T) => T)(current) : value
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(next))
    }
    emitChange()
  }, [key, getSnapshot, emitChange])

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return [value, setValue] as const
}
