import { expect, test } from '@playwright/test'

test('published portfolio preserves ordering and case-study behavior', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('article[aria-label$="case study"], a[href^="/work/"]')
  await expect(cards).toHaveCount(7)
  await expect(cards.first()).toContainText('Datadog')
  await page.goto('/work/dairy-queen')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dairy Queen')
})
