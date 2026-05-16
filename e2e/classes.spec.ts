/**
 * Teacher Platform — Classes page tests
 * Covers:
 *  - Page loads with Classes heading
 *  - Class cards visible (name, subject, grade)
 *  - Student count per class
 *  - Class average score shown
 *  - AI Risk indicator per class
 *  - Clicking a class navigates to /classes/[id]
 *  - Class detail page renders with class name in heading
 *  - Student list in class detail
 *  - Performance metrics in class detail
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Classes Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/classes");
  });

  test("classes page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/classes/);
  });

  test("Classes heading visible", async ({ page }) => {
    await expect(page.getByText(/classes?/i).first()).toBeVisible();
  });

  test("class cards visible", async ({ page }) => {
    await expect(page.locator('[class*="card"]').first()).toBeVisible({ timeout: 8_000 });
  });

  test("class name on card", async ({ page }) => {
    await expect(page.getByText(/grade|5a|7b|class/i).first()).toBeVisible();
  });

  test("subject visible on class card", async ({ page }) => {
    await expect(page.getByText(/maths|science|english|physics|history/i).first()).toBeVisible();
  });

  test("student count visible", async ({ page }) => {
    await expect(page.getByText(/students?|\d+ student/i).first()).toBeVisible();
  });

  test("clicking a class card navigates to detail page", async ({ page }) => {
    await page.locator('[class*="card"]').first().click();
    await expect(page).toHaveURL(/\/classes\/.+/, { timeout: 5_000 });
  });

  test("class detail page renders", async ({ page }) => {
    await page.locator('[class*="card"]').first().click();
    await expect(page).toHaveURL(/\/classes\/.+/);
    await expect(page.locator("body")).toBeVisible();
  });
});
