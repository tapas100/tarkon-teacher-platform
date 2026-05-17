/**
 * Teacher Platform — Login tests
 * Covers:
 *  - Login page loads with Tarkon branding
 *  - School stats visible on left panel (desktop)
 *  - Email and password fields present
 *  - Empty submission — shows loading or validation
 *  - Valid credentials redirect to /home
 *  - Password show/hide toggle
 *  - Trust badges visible
 *  - "AI-Powered Teaching" label visible
 */
import { test, expect } from "@playwright/test";
import { TeacherLoginPage } from "./pages/TeacherLoginPage";

test.describe("Teacher Login", () => {
  let loginPage: TeacherLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new TeacherLoginPage(page);
    await loginPage.goto();
  });

  test("login page loads", async ({ page }) => {
    await expect(page).toHaveURL(/\/login/);
  });

  test("Tarkon branding visible", async ({ page }) => {
    await expect(page.getByText(/tarkon/i).first()).toBeVisible();
  });

  test("Teacher Platform label visible", async ({ page }) => {
    await expect(page.getByText(/teacher platform/i).first()).toBeVisible();
  });

  test("AI-Powered Teaching label visible (desktop)", async ({ page }) => {
    await expect(page.getByText(/ai.powered classroom intelligence/i)).toBeVisible();
  });

  test("school stats visible (desktop)", async () => {
    await loginPage.expectSchoolStats();
  });

  test("email input is present", async () => {
    await expect(loginPage.emailInput).toBeVisible();
  });

  test("password input is present", async () => {
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("password field is type=password by default", async () => {
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });

  test("show password toggle reveals password text", async ({ page }) => {
    await loginPage.passwordInput.fill("mypassword");
    // The eye toggle is the button immediately following the password input (absolute positioned)
    // It's contained within the same relative div as the password input
    const passwordWrapper = page.locator('input[placeholder="Enter password"]').locator("..");
    const eyeBtn = passwordWrapper.locator('button[type="button"]');
    await eyeBtn.click();
    // After toggle, the password input type changes to "text"
    const newType = await page.locator('input[placeholder="Enter password"]').getAttribute("type");
    expect(newType).toBe("text");
  });

  test("submit button is visible", async () => {
    await expect(loginPage.submitButton).toBeVisible();
  });

  test("valid credentials redirect to /home", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ access_token: "mock_token", token_type: "bearer" }),
      });
    });
    await loginPage.emailInput.fill("ananya@tarkon.school");
    await loginPage.passwordInput.fill("password");
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/\/home/, { timeout: 15_000 });
  });

  test("invalid credentials show error", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({ status: 401, body: JSON.stringify({ detail: "Invalid credentials" }) });
    });
    await loginPage.emailInput.fill("bad@test.com");
    await loginPage.passwordInput.fill("wrongpass");
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage.or(page.getByText(/invalid|error|wrong/i).first())).toBeVisible({ timeout: 8_000 });
  });

  test("trust / security badges visible", async ({ page }) => {
    await expect(page.getByText(/SOC 2|ISO|secure|verified|shield|256-bit|FERPA/i).first()).toBeVisible();
  });
});
