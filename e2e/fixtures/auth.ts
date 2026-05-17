/**
 * Re-export @playwright/test unchanged.
 * Auth is now handled via storageState in playwright.config.ts
 * so every authenticated test project already has the token injected.
 * Keeping this file so existing imports don't break.
 */
export { test, expect } from "@playwright/test";
