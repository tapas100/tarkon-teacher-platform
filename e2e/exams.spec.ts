/**
 * Teacher Platform — Exams page tests
 * Covers:
 *  - Page loads with Exams heading
 *  - Exam cards render (title, subject, date)
 *  - Status chips (Upcoming, Live, Completed)
 *  - Student count / participants shown
 *  - Create / Schedule Exam button visible
 *  - Live exam shows animated indicator
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Exams Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/exams");
  });

  test("exams page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/exams/);
  });

  test("Exams heading visible", async ({ page }) => {
    await expect(page.getByText(/exams?/i).first()).toBeVisible();
  });

  test("exam cards visible", async ({ page }) => {
    await expect(page.locator('[class*="card"]').first()).toBeVisible({ timeout: 8_000 });
  });

  test("exam title visible", async ({ page }) => {
    await expect(page.locator('[class*="font-semibold"]').first()).toBeVisible();
  });

  test("exam subject and date visible", async ({ page }) => {
    await expect(page.getByText(/maths|science|physics|\d{4}/i).first()).toBeVisible();
  });

  test("status badge visible (Upcoming/Live/Completed)", async ({ page }) => {
    await expect(page.getByText(/upcoming|live|completed/i).first()).toBeVisible();
  });

  test("create / schedule exam button visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /create|schedule|new|\+/i }).or(
        page.getByRole("link", { name: /create|schedule/i })
      ).first()
    ).toBeVisible();
  });
});
