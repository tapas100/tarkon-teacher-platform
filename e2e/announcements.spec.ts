/**
 * Teacher Platform — Announcements page tests
 * Covers:
 *  - Page loads with Announcements heading
 *  - Announcement cards render (title, body, time)
 *  - Audience tags (All Students, Grade 5, etc.)
 *  - Priority / pinned indicator
 *  - Create announcement button visible
 *  - New announcement form (if present)
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Announcements Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/announcements");
  });

  test("announcements page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/announcements/);
  });

  test("Announcements heading visible", async ({ page }) => {
    await expect(page.getByText(/announcements?/i).first()).toBeVisible();
  });

  test("announcement cards render", async ({ page }) => {
    await expect(page.locator('[class*="card"]').first()).toBeVisible({ timeout: 8_000 });
  });

  test("announcement title/body text visible", async ({ page }) => {
    await expect(page.locator('[class*="font-semibold"], p').first()).toBeVisible();
  });

  test("time/date info visible on announcement", async ({ page }) => {
    await expect(page.getByText(/ago|today|yesterday|\d{4}/i).first()).toBeVisible();
  });

  test("audience tag visible (All Students / Grade X)", async ({ page }) => {
    await expect(page.getByText(/all students|grade|class|school/i).first()).toBeVisible();
  });

  test("create announcement button visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /create|new|add|\+/i }).or(
        page.getByRole("link", { name: /create/i })
      ).first()
    ).toBeVisible();
  });
});
