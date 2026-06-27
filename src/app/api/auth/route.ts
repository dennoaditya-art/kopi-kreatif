import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASS = process.env.DASHBOARD_ADMIN_PASS || "admin123"
const COOKIE_NAME = "kopi-auth"
const COOKIE_MAX_AGE = 60 * 60 * 4 // 4 jam

function makeToken() {
  const payload = JSON.stringify({ authed: true, ts: Date.now() })
  const encoded = Buffer.from(payload).toString("base64")
  return `${encoded}.${ADMIN_PASS.slice(0, 8)}`
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const sig = parts[1]
  if (sig !== ADMIN_PASS.slice(0, 8)) return false
  try {
    const payload = JSON.parse(Buffer.from(parts[0], "base64").toString())
    if (!payload.authed) return false
    if (Date.now() - payload.ts > COOKIE_MAX_AGE * 1000) return false
    return true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body

  if (password !== ADMIN_PASS) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const ok = verifyToken(token)
  return NextResponse.json({ ok })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ ok: true })
}
