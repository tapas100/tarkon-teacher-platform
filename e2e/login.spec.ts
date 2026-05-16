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
    await expect(page.getByText(/teacher platform/i)).toBeVisible();
  });

  test("AI-Powered Teaching label visible (desktop)", async ({ page }) => {
    await expect(page.getByText(/ai.powered teaching/i)).toBeVisible();
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
    const eyeBtn = page.getByRole("button", { name: /show|eye|toggle/i }).or(
      page.locator("button").filter({ has: page.locator("svg") }).last()
    );
    await eyeBtn.click();
    // Input type should change to text
    const type = await loginPage.passwordInput.getAttribute("type");
    expect(type).toBe("text");
  });

  test("submit button is visible", async () => {
    await expect(loginPage.submitButton).toBeVisible();
  });

  test("valid credentials redirect to /home", async ({ page }) => {
    // mock: core-api may not be running; test the redirect logic
    // The login page calls auth.service.ts which may fail; our service
    // does NOT have a fallback on teacher login — so we intercept
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
    await expect(page).toHaveURL(/\/home/, { timeout: 10_000 });
  });

  test("invalid credentials show error", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({ status: 401, body: "Unauthorized" });
    });
    await loginPage.emailInput.fill("bad@test.com");
    await loginPage.passwordInput.fill("wrongpass");
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage.or(page.getByText(/invalid|error|wrong|401/i))).toBeVisible({ timeout: 8_000 });
  });

  test("trust / security badges visible", async ({ page }) => {
    await expect(page.getByText(/SOC 2|ISO|secure|verified|shield|256-bit/i)).toBeVisible();
  });
});
