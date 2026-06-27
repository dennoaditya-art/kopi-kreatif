"use client"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export interface UserAccount {
  name: string
  email: string
  password: string
}

export interface AuthSession {
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthSession | null
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  isAuthenticated: boolean
}

const ACCOUNTS_KEY = "kopi-accounts"
const SESSION_KEY = "kopi-session"

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useLocalStorage<UserAccount[]>(ACCOUNTS_KEY, [])
  const [session, setSession] = useLocalStorage<AuthSession | null>(SESSION_KEY, null)

  const register = useCallback((name: string, email: string, password: string) => {
    const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (existing) return { ok: false, error: "Email sudah terdaftar" }
    setAccounts((prev) => [...prev, { name, email: email.toLowerCase(), password }])
    return { ok: true }
  }, [accounts, setAccounts])

  const login = useCallback((email: string, password: string) => {
    const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!found) return { ok: false, error: "Email tidak terdaftar" }
    if (found.password !== password) return { ok: false, error: "Password salah" }
    setSession({ name: found.name, email: found.email })
    return { ok: true }
  }, [accounts, setSession])

  const logout = useCallback(() => {
    setSession(null)
  }, [setSession])

  return (
    <AuthContext.Provider value={{ user: session, register, login, logout, isAuthenticated: session !== null }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}