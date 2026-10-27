import { test, expect } from '@playwright/test'

/**
 * The theme is a <html data-theme> attribute applied before first paint by
 * the bootstrap script in layout.tsx. This spec pins the two contracts that
 * matter for the console: the toggle works from the auth screen, and the
 * choice survives a reload.
 */

test('light mode toggles from the auth screen and persists after reload', async ({ page }) => {
  await page.goto('/console')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.getByRole('button', { name: /switch to light mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.getByRole('button', { name: /switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
