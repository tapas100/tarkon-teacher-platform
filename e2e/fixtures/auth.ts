/**
 * Shared fixture — logs in the teacher by mocking /auth/login
 * and stores the auth state in a storageState file.
 *
 * Usage in any spec:
 *   import { test } from "./fixtures/auth";
 */
import { test as base, expect } from "@playwright/test";
import { TeacherLoginPage } from "../pages/TeacherLoginPage";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Intercept login API
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ access_token: "mock_token_fixture", token_type: "bearer" }),
      });
    });

    // Set token in localStorage before navigating
    await page.goto("/login");
    await page.evaluate(() => {
      localStorage.setItem("tarkon_token", "mock_token_fixture");
    });

    // Go directly to /home
    await page.goto("/home");
    await expect(page).toHaveURL(/\/home/, { timeout: 15_000 });

    await use(page);
  },
});

export { expect };
