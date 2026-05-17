/**
 * Global setup for teacher platform tests.
 * Injects the auth token into localStorage so all specs
 * start already authenticated — no login UI required.
 */
import { chromium, FullConfig } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL ?? "http://localhost:3001";
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Intercept the login API call so we don't need a real backend
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ access_token: "e2e_teacher_token", token_type: "bearer" }),
    });
  });

  await page.goto(`${baseURL}/login`);

  // Inject token directly into localStorage
  await page.evaluate((token) => {
    localStorage.setItem("tarkon_token", token);
  }, "e2e_teacher_token");

  // Navigate to /home to confirm the app accepts the token
  await page.goto(`${baseURL}/home`);
  await page.waitForURL(/\/home/, { timeout: 15_000 });

  // Save storageState
  const authDir = path.join("e2e", ".auth");
  fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: path.join(authDir, "teacher.json") });

  await browser.close();
  console.log("✓ Teacher auth storage state saved");
}

export default globalSetup;
