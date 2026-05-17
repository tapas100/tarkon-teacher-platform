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
    // Placeholder is "ananya@school.com" not a generic "email" placeholder
    return this.page.locator('input[type="email"]');
  }

  get passwordInput() {
    return this.page.locator('input[type="password"], input[placeholder*="password" i]').first();
  }

  get submitButton() {
    // "Sign In" button (submit); avoid matching "Sign in with Biometrics"
    return this.page.locator('button[type="submit"]');
  }

  get errorMessage() {
    return this.page.locator('[class*="error"], [class*="text-red"], [class*="alert"]');
  }

  async login(email = "ananya@tarkon.school", password = "password") {
    await this.goto();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForURL(/\/home/, { timeout: 15_000, waitUntil: "commit" });
  }

  async expectSchoolStats() {
    await expect(this.page.getByText(/active teachers|students enrolled|classes today/i).first()).toBeVisible();
  }
}

