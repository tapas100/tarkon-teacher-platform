/**
 * Page Object — Teacher Login
 */
import { Page, expect } from "@playwright/test";

export class TeacherLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  get emailInput() {
    return this.page.getByPlaceholder(/email/i);
  }

  get passwordInput() {
    return this.page.getByPlaceholder(/password/i);
  }

  get submitButton() {
    return this.page.getByRole("button", { name: /sign in|log in|continue/i });
  }

  get errorMessage() {
    return this.page.locator('[class*="error"], [class*="text-red"], [class*="alert"]');
  }

  async login(email = "ananya@tarkon.school", password = "password") {
    await this.goto();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    // App uses mock-login (core-api may not be running in test) — expect redirect to /home
    await this.page.waitForURL(/\/home/, { timeout: 15_000 });
  }

  async expectSchoolStats() {
    await expect(this.page.getByText(/active teachers|students enrolled|classes today/i)).toBeVisible();
  }
}
