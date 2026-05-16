/**
 * Page Object — Teacher Dashboard (shared helpers)
 */
import { Page, expect } from "@playwright/test";

export class TeacherDashboard {
  constructor(private page: Page) {}

  /** Navigate via sidebar link */
  async navTo(label: string) {
    await this.page.getByRole("link", { name: new RegExp(label, "i") })
      .or(this.page.getByRole("button", { name: new RegExp(label, "i") }))
      .first()
      .click();
  }

  get sidebar() {
    return this.page.locator("aside, nav, [class*='Sidebar'], [class*='sidebar']").first();
  }

  get topBar() {
    return this.page.locator("header, [class*='TopBar'], [class*='topbar']").first();
  }

  get fabButton() {
    return this.page.locator("[class*='FAB'], [aria-label*='new'], button[class*='fixed']").first();
  }

  get aiPanel() {
    return this.page.locator("[class*='AIPanel'], [class*='ai-panel'], [class*='AIBottom']").first();
  }

  async expectPageTitle(text: string | RegExp) {
    await expect(this.page.getByRole("heading", { name: text }).or(
      this.page.getByText(text)
    ).first()).toBeVisible();
  }

  async expectStatCard(label: string | RegExp) {
    await expect(this.page.getByText(label)).toBeVisible();
  }
}
