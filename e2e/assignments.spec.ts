/**
 * Teacher Platform — Assignments page tests
 * Covers:
 *  - Page loads with Assignments heading
 *  - Assignment cards render (title, subject, grade, topic)
 *  - Status badges: Pending, Submitted, Graded, Overdue
 *  - AI Checked badge shown where applicable
 *  - Submission progress bar per card
 *  - Submission count visible (e.g. "23/30")
 *  - Bloom's taxonomy tags shown on cards
 *  - Due date visible on cards
 *  - Create Assignment button / + button visible
 *  - Search / filter input visible
 *  - Clicking Create navigates to /assignments/create
 *  - Create Assignment page: form renders (title, subject, grade, etc.)
 *  - AI Generate button on create page
 *  - Upload file option on create page
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Assignments Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/assignments");
  });

  test("page loads with Assignments heading", async ({ page }) => {
    await expect(page.getByText(/assignments?/i).first()).toBeVisible();
  });

  test("assignment cards visible", async ({ page }) => {
    await expect(page.locator('[class*="card"]').first()).toBeVisible();
  });

  test("assignment title visible on card", async ({ page }) => {
    // mock-data ASSIGNMENTS has titles
    await expect(page.locator('[class*="font-semibold"]').first()).toBeVisible();
  });

  test("subject and grade info on card", async ({ page }) => {
    await expect(page.getByText(/grade|maths|physics|science/i).first()).toBeVisible();
  });

  test("status badge visible (Pending/Submitted/Graded/Overdue)", async ({ page }) => {
    await expect(page.getByText(/pending|submitted|graded|overdue/i).first()).toBeVisible();
  });

  test("AI Checked badge visible on relevant cards", async ({ page }) => {
    await expect(page.getByText(/ai checked/i).first()).toBeVisible();
  });

  test("submission progress bar visible", async ({ page }) => {
    await expect(page.locator('[role="progressbar"], [class*="progress"]').first()).toBeVisible();
  });

  test("submission count visible (e.g. 23/30)", async ({ page }) => {
    await expect(page.getByText(/\d+\/\d+/)).toBeVisible();
  });

  test("Bloom's taxonomy tags visible", async ({ page }) => {
    await expect(page.getByText(/remember|understand|apply|analyse|evaluate|create/i)).toBeVisible();
  });

  test("due date visible", async ({ page }) => {
    await expect(page.getByText(/due|deadline|\d{4}/i).first()).toBeVisible();
  });

  test("Create Assignment button visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /create|new|\+/i }).or(
        page.getByRole("link", { name: /create/i })
      ).first()
    ).toBeVisible();
  });

  test("Search input visible", async ({ page }) => {
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test("navigating to /assignments/create renders form", async ({ page }) => {
    await page.goto("/assignments/create");
    await expect(page.locator("form, [class*='form'], input").first()).toBeVisible();
  });

  test("create page has AI Generate option", async ({ page }) => {
    await page.goto("/assignments/create");
    await expect(page.getByText(/ai|generate|sparkles/i)).toBeVisible();
  });

  test("create page has file upload option", async ({ page }) => {
    await page.goto("/assignments/create");
    await expect(page.getByText(/upload|file|attach/i)).toBeVisible();
  });
});
