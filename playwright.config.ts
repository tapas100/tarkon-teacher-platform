import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 4,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
  globalSetup: "./e2e/global-setup.ts",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // Login tests — no storageState (tests the login page UI)
    {
      name: "login",
      testMatch: "**/login.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    // All other authenticated tests
    {
      name: "chromium-auth",
      testIgnore: "**/login.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/teacher.json",
      },
    },
    // Mobile viewport
    {
      name: "mobile-auth",
      testIgnore: "**/login.spec.ts",
      use: {
        ...devices["Pixel 5"],
        storageState: "e2e/.auth/teacher.json",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
