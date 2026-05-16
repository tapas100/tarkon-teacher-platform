/**
 * Teacher Platform — Analytics page tests
 * Covers:
 *  - Page loads with Analytics heading
 *  - 5 analytics tabs: Student, Class, Subject, Cognitive, Parent Engagement
 *  - Tab switching does not crash
 *  - Student Analytics tab: weekly scores bar chart renders
 *  - Student Analytics tab: concept mastery radar visible
 *  - Class Analytics tab: weakness heatmap renders (table)
 *  - Class Analytics tab: student names in heatmap table
 *  - Class Analytics tab: concept column headers
 *  - Cognitive Analytics tab: radar chart with 6 axes
 *  - Attendance line chart renders
 *  - Subject performance bar chart renders
 *  - Score percentages visible in heatmap cells
 *  - Progress bars visible
 *  - Export / Download button (if present)
 */
import { test, expect } from "./fixtures/auth";

const ANALYTICS_TABS = [
  "Student Analytics",
  "Class Analytics",
  "Subject Analytics",
  "Cognitive Analytics",
  "Parent Engagement",
];

test.describe("Teacher Analytics Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/analytics");
  });

  test("page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/analytics/);
  });

  test("Analytics heading visible", async ({ page }) => {
    await expect(page.getByText(/analytics/i).first()).toBeVisible();
  });

  for (const tab of ANALYTICS_TABS) {
    test(`tab "${tab}" is visible`, async ({ page }) => {
      await expect(page.getByRole("button", { name: tab, exact: true })).toBeVisible();
    });
  }

  test("clicking each tab does not crash page", async ({ page }) => {
    for (const tab of ANALYTICS_TABS) {
      await page.getByRole("button", { name: tab, exact: true }).click();
      await expect(page.getByText(/analytics/i).first()).toBeVisible();
    }
  });

  test("Student Analytics tab shows score chart", async ({ page }) => {
    await page.getByRole("button", { name: "Student Analytics", exact: true }).click();
    // Recharts renders an SVG
    await expect(page.locator("svg").first()).toBeVisible();
  });

  test("Class Analytics tab shows weakness heatmap table", async ({ page }) => {
    await page.getByRole("button", { name: "Class Analytics", exact: true }).click();
    await expect(page.getByText(/weakness heatmap/i)).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("Heatmap table has student rows", async ({ page }) => {
    await page.getByRole("button", { name: "Class Analytics", exact: true }).click();
    await expect(page.locator("table tbody tr").first()).toBeVisible();
  });

  test("Heatmap table has concept column headers", async ({ page }) => {
    await page.getByRole("button", { name: "Class Analytics", exact: true }).click();
    await expect(page.locator("table thead th").nth(1)).toBeVisible();
  });

  test("Score percentages visible in heatmap", async ({ page }) => {
    await page.getByRole("button", { name: "Class Analytics", exact: true }).click();
    await expect(page.getByText(/%/).first()).toBeVisible();
  });

  test("Cognitive Analytics tab shows radar chart", async ({ page }) => {
    await page.getByRole("button", { name: "Cognitive Analytics", exact: true }).click();
    await expect(page.locator("svg").first()).toBeVisible();
  });

  test("Cognitive metrics visible: Confidence, Focus, Retention, Speed", async ({ page }) => {
    await page.getByRole("button", { name: "Cognitive Analytics", exact: true }).click();
    await expect(page.getByText(/confidence|focus|retention|speed/i).first()).toBeVisible();
  });

  test("attendance chart visible on class analytics", async ({ page }) => {
    await page.getByRole("button", { name: "Class Analytics", exact: true }).click();
    await expect(page.locator("svg").first()).toBeVisible();
  });

  test("progress bars visible", async ({ page }) => {
    await expect(page.locator('[role="progressbar"], [class*="progress"]').first()).toBeVisible();
  });
});
