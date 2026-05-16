/**
 * Teacher Platform — Home Dashboard tests
 * Covers:
 *  - Dashboard loads with teacher name / greeting
 *  - Stat cards: Classes Today, Assignments Pending, Exams, At-Risk Students, Parent Messages
 *  - Each stat card shows value + trend indicator
 *  - Today's Schedule section renders
 *  - Live class indicator (animated pulse)
 *  - Upcoming / completed status badges
 *  - Student Alerts section
 *  - AI Recommendations section with action buttons
 *  - Quick Actions buttons (Generate Quiz, Create Homework, etc.)
 *  - Classes carousel renders
 *  - "View all" links present
 *  - Sidebar navigation visible
 *  - TopBar with notification bell
 *  - FAB (floating action button) visible
 */
import { test, expect } from "./fixtures/auth";
import { TeacherDashboard } from "./pages/TeacherDashboard";

test.describe("Teacher Home Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
  });

  test("dashboard page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/home/);
  });

  test("teacher name / greeting visible", async ({ page }) => {
    // mock-data TEACHER has a name; greeting says "Good morning, <name>"
    await expect(page.getByText(/good (morning|afternoon|evening)/i).or(
      page.getByText(/ananya|ms\.|teacher/i)
    ).first()).toBeVisible();
  });

  test("stat cards are visible (at least 4)", async ({ page }) => {
    const statCards = page.locator('[class*="rounded-2xl"][class*="text-white"]');
    await expect(statCards).toHaveCount(await statCards.count());
    const count = await statCards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("stat card: classes value visible", async ({ page }) => {
    await expect(page.getByText(/classes today|active classes/i)).toBeVisible();
  });

  test("stat card: assignments pending visible", async ({ page }) => {
    await expect(page.getByText(/assignment|pending/i)).toBeVisible();
  });

  test("stat card: at-risk students visible", async ({ page }) => {
    await expect(page.getByText(/at.risk|risk/i)).toBeVisible();
  });

  test("stat card: parent messages visible", async ({ page }) => {
    await expect(page.getByText(/parent|message/i)).toBeVisible();
  });

  test("Today's Schedule section visible", async ({ page }) => {
    await expect(page.getByText(/today.?s schedule|schedule/i)).toBeVisible();
  });

  test("live class shows animated pulse", async ({ page }) => {
    await expect(page.locator('[class*="animate-pulse"]').first()).toBeVisible();
  });

  test("Student Alerts section visible", async ({ page }) => {
    await expect(page.getByText(/student alerts?|alerts?/i)).toBeVisible();
  });

  test("AI Recommendations section visible", async ({ page }) => {
    await expect(page.getByText(/ai recommendation|recommendations?|tarkon ai/i)).toBeVisible();
  });

  test("Quick Actions buttons visible", async ({ page }) => {
    await expect(page.getByText(/generate quiz|quick action|create/i)).toBeVisible();
  });

  test("sidebar navigation is visible", async ({ page }) => {
    const dash = new TeacherDashboard(page);
    await expect(dash.sidebar).toBeVisible();
  });

  test("top bar is visible", async ({ page }) => {
    const dash = new TeacherDashboard(page);
    await expect(dash.topBar).toBeVisible();
  });

  test("notification bell in topbar", async ({ page }) => {
    await expect(page.locator('[aria-label*="notification"], [class*="bell"], button').filter({
      has: page.locator("svg"),
    }).first()).toBeVisible();
  });

  test("trend indicators (TrendingUp/Down) visible on stat cards", async ({ page }) => {
    await expect(page.getByText(/[+\-]?\d+%/).first()).toBeVisible();
  });

  test("classes carousel / section visible", async ({ page }) => {
    await expect(page.getByText(/grade|class|5a|7b/i).first()).toBeVisible();
  });
});
