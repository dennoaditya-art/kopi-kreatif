import { test, expect } from "@playwright/test"

test.describe("KOPI Nusantara — Smoke Tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/KOPI/)
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("catalog page shows products", async ({ page }) => {
    await page.goto("/katalog")
    await expect(page.locator("h1")).toContainText("Katalog")
    const products = page.locator('[role="button"]')
    await expect(products.first()).toBeVisible({ timeout: 5000 })
  })

  test("product detail page loads", async ({ page }) => {
    await page.goto("/produk/espresso-blend")
    await expect(page.locator("h1")).toContainText("Espresso Blend")
    await expect(page.getByRole("button", { name: /Tambah ke Keranjang/i })).toBeVisible()
  })

  test("cart page shows empty state", async ({ page }) => {
    await page.goto("/keranjang")
    await expect(page.locator("text=/masih kosong/i")).toBeVisible()
  })

  test("dark mode toggle works", async ({ page }) => {
    await page.goto("/")
    const html = page.locator("html")
    const initial = await html.getAttribute("class")
    await page.getByLabel(/Toggle tema/i).click()
    const after = await html.getAttribute("class")
    expect(initial).not.toBe(after)
  })

  test("navigation links work", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /tentang/i }).first().click()
    await expect(page).toHaveURL(/\/tentang/)
  })

  test("404 page shows", async ({ page }) => {
    await page.goto("/halaman-tidak-ada")
    await expect(page.locator("text=/Tidak Ditemukan/i").or(page.locator("text=/Not Found/i"))).toBeVisible()
  })

  test("i18n locale switch works", async ({ page }) => {
    await page.goto("/")
    const btn = page.getByLabel(/Ganti bahasa/i)
    await btn.click()
    await expect(page.getByText("Catalog").first()).toBeVisible()
  })
})
