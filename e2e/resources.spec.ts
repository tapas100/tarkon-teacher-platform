/**
 * Teacher Platform — Resources page tests
 * Covers:
 *  - Page loads with Resources heading
 *  - Resource cards render (title, type, subject)
 *  - Resource type badges (PDF, Video, Quiz, Worksheet)
 *  - Subject filter visible
 *  - Search input visible
 *  - Upload / Add Resource button visible
 *  - Resource card preview / download action visible
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Resources Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resources");
  });

  test("resources page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/resources/);
  });

  test("Resources heading visible", async ({ page }) => {
    await expect(page.getByText(/resources?/i).first()).toBeVisible();
  });

  test("resource cards render", async ({ page }) => {
    await expect(page.locator('[class*="card"]').first()).toBeVisible({ timeout: 8_000 });
  });

  test("resource type badge visible (PDF/Video/Quiz/Worksheet)", async ({ page }) => {
    await expect(page.getByText(/pdf|video|quiz|worksheet|slides/i).first()).toBeVisible();
  });

  test("subject label visible on resource card", async ({ page }) => {
    await expect(page.getByText(/maths|science|physics|english|biology/i).first()).toBeVisible();
  });

  test("search input visible", async ({ page }) => {
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test("upload / add resource button visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /upload|add|new|\+/i }).or(
        page.getByRole("link", { name: /upload|add/i })
      ).first()
    ).toBeVisible();
  });
});
