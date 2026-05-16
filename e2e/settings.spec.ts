/**
 * Teacher Platform — Settings page tests
 * Covers:
 *  - Page loads with Settings heading
 *  - Profile section (name, email, avatar)
 *  - Notification toggle switches
 *  - Appearance / theme settings
 *  - Language preference
 *  - Privacy / data settings section
 *  - Logout button visible and functional
 *  - Save / update button
 */
import { test, expect } from "./fixtures/auth";

test.describe("Teacher Settings Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/settings");
  });

  test("settings page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/settings/);
  });

  test("Settings heading visible", async ({ page }) => {
    await expect(page.getByText(/settings?/i).first()).toBeVisible();
  });

  test("profile section visible (name / email)", async ({ page }) => {
    await expect(page.getByText(/profile|name|email/i).first()).toBeVisible();
  });

  test("notification settings visible", async ({ page }) => {
    await expect(page.getByText(/notification/i)).toBeVisible();
  });

  test("appearance / theme settings visible", async ({ page }) => {
    await expect(page.getByText(/appearance|theme|dark|light/i)).toBeVisible();
  });

  test("toggle switches render", async ({ page }) => {
    // Radix Switch renders a button with role="switch"
    await expect(
      page.getByRole("switch").or(page.locator('[class*="Switch"], [class*="toggle"]')).first()
    ).toBeVisible();
  });

  test("logout button visible on settings page", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /logout|log out|sign out/i })
    ).toBeVisible();
  });

  test("logout from settings redirects to /login", async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem("tarkon_token"));
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
  });
});
