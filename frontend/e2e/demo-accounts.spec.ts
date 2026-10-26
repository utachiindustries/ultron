import { test, expect, type Page } from '@playwright/test'

/**
 * Requires `python seed_demo.py` to have been run against the backend this
 * suite points at -- these personas don't exist otherwise, and the buttons
 * will surface the backend's normal "incorrect email or password" error.
 */

const DASHBOARD_TITLES = {
  Admin: 'Platform overview',
  Analyst: 'Operations overview',
  Client: 'Your security posture',
  Club: 'Club security posture',
} as const

async function loginAsDemo(page: Page, role: keyof typeof DASHBOARD_TITLES) {
  await page.goto('/console')
  await expect(page.getByText('Sign in to the operator console.')).toBeVisible()
  await page.getByRole('button', { name: `Try as ${role}` }).click()
  await expect(page.getByRole('heading', { name: DASHBOARD_TITLES[role] })).toBeVisible({ timeout: 10000 })
}

async function signOut(page: Page) {
  await page.getByRole('button', { name: 'Sign out' }).click()
  await expect(page.getByText('Sign in to the operator console.')).toBeVisible()
}

test('Try as Admin signs in as the admin persona with full nav', async ({ page }) => {
  await loginAsDemo(page, 'Admin')
  await expect(page.getByText('admin@ultorn.local')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Admin workspace')).toBeVisible()
  await expect(page.getByText('Clients protected')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Admin', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Audit', exact: true })).toBeVisible()
})

test('Try as Analyst signs in as the analyst persona, no Admin nav item', async ({ page }) => {
  await loginAsDemo(page, 'Analyst')
  await expect(page.getByText('analyst-demo@ultorn.local')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Analyst workspace')).toBeVisible()
  await expect(page.getByText('Awaiting review').first()).toBeVisible()
  await expect(page.getByText('Clients protected')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Audit', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Admin', exact: true })).toHaveCount(0)
})

test('Try as Client signs in as the client persona: tight nav, own-results dashboard, no mutation controls', async ({ page }) => {
  await loginAsDemo(page, 'Client')
  await expect(page.getByText('client-demo@sahelbank.sn')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Client portal')).toBeVisible()

  // Regression test: the dashboard used to bundle the admin/analyst-only
  // /audit call into the same Promise.all as calls a client role CAN make,
  // so one 403 failed the whole dashboard. It must render real content --
  // the client portal's own narrative cards, not the operator stat grid.
  await expect(page.getByText('Could not load your dashboard')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Findings', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Alerts', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Compliance', exact: true })).toBeVisible()

  await expect(page.getByRole('button', { name: 'Audit', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Admin', exact: true })).toHaveCount(0)

  // The client nav is a structurally separate, tighter list -- operator
  // tooling (Scans, Monitors, Scan Schedules, Code Scans, AI Guard) that
  // *produces* findings/alerts isn't just hidden behind a role check, it's
  // not in the nav at all.
  await expect(page.getByRole('button', { name: 'Scans', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Monitors', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Scan Schedules', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Code Scans', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'AI Guard', exact: true })).toHaveCount(0)

  await page.getByRole('button', { name: 'Organization', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Organization', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '+ Add client' })).toHaveCount(0)
})

test('Try as Club gets the club portal, scoped to Dakar United FC', async ({ page }) => {
  await loginAsDemo(page, 'Club')
  await expect(page.locator('.console-main').getByText('Club portal')).toBeVisible()
  await expect(page.getByText('client-demo@dakarunitedfc.sn')).toBeVisible()
  await expect(page.getByText('Dakar United FC').first()).toBeVisible()
  await expect(page.getByText('Sahel Bank')).toHaveCount(0)
  await expect(page.getByText('Clients protected')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Scans', exact: true })).toHaveCount(0)
})

test('switching between demo personas never leaks the wrong role (regression)', async ({ page }) => {
  await loginAsDemo(page, 'Admin')
  await expect(page.getByText('admin@ultorn.local')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Admin workspace')).toBeVisible()
  await signOut(page)

  await loginAsDemo(page, 'Analyst')
  await expect(page.getByText('analyst-demo@ultorn.local')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Analyst workspace')).toBeVisible()
  await expect(page.getByText('Admin workspace')).toHaveCount(0)
  await expect(page.getByText('admin@ultorn.local')).toHaveCount(0)
  await signOut(page)

  await loginAsDemo(page, 'Client')
  await expect(page.getByText('client-demo@sahelbank.sn')).toBeVisible()
  await expect(page.locator('.console-main').getByText('Client portal')).toBeVisible()
  await expect(page.getByText('Analyst workspace')).toHaveCount(0)
  await expect(page.getByText('analyst-demo@ultorn.local')).toHaveCount(0)
  // The stale-permission bug made this exact transition fail with a 403 from
  // /audit (an analyst-only endpoint) on the client's dashboard.
  await expect(page.getByText('Could not load your dashboard')).toHaveCount(0)
  await expect(page.getByText('Insufficient permissions')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Findings', exact: true })).toBeVisible()
})
