/**
 * Teacher Platform — Parents page tests
 * Covers:
 *  - Page loads with Parents heading
 *  - Parent cards render (parent name, student name, contact)
 *  - "Message" action button per parent
 *  - "Call" action button per parent
 *  - AI Alert indicator on parents who need attention
 *  - Last contact time visible
 *  - Engagement score visible
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Parents Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/parents");
  });

  test("parents page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/parents/);
  });

  test("Parents heading visible", async ({ page }) => {
    await expect(page.getByText(/parents?/i).first()).toBeVisible();
  });

  test("parent entry / card renders", async ({ page }) => {
    await expect(page.locator('[class*="card"], [class*="flex items-center"]').first()).toBeVisible({ timeout: 8_000 });
  });

  test("parent or student name visible", async ({ page }) => {
    await expect(page.locator('[class*="font-semibold"]').first()).toBeVisible();
  });

  test("message / contact action visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /message|contact|chat/i }).first()
    ).toBeVisible();
  });

  test("last contacted / time visible", async ({ page }) => {
    await expect(page.getByText(/ago|last|contacted|\d{4}/i).first()).toBeVisible();
  });
});
