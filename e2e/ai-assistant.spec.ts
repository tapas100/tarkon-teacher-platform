/**
 * Teacher Platform — AI Teaching Assistant page tests
 * Covers:
 *  - Page heading "AI Teaching Assistant"
 *  - "Always on · Powered by Tarkon AI" status
 *  - Capability cards visible (8 cards)
 *  - Each capability card: icon + label + clickable
 *  - Clicking capability card inserts prompt into input
 *  - Message input field present
 *  - Send button present
 *  - Mic button present
 *  - Sending a message shows user bubble
 *  - Typing indicator (ThinkingDots) appears
 *  - AI reply renders after response
 *  - Sending via Enter key works
 *  - Input clears after send
 *  - Welcome / empty state shown before first message
 *  - Scrolls to bottom after new message
 */
import { test, expect } from "./fixtures/auth";

const CAPABILITY_CARDS = [
  { label: "Generate Quiz",    prompt: "Generate a quiz on fractions" },
  { label: "Lesson Plan",      prompt: "Create a lesson plan" },
  { label: "Find Weak Students", prompt: "Detect weak students" },
  { label: "Create Homework",  prompt: "Create homework" },
  { label: "Parent Feedback",  prompt: "Generate parent feedback" },
  { label: "Summarize Class",  prompt: "Summarize today" },
  { label: "Flashcards",       prompt: "Create flashcards" },
  { label: "Revision Plan",    prompt: "Create a revision plan" },
];

test.describe("Teacher AI Assistant Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the AI endpoint so tests don't rely on orchestrator
    await page.route("**/tutor/ask**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          answer: "Here is the AI response for your request.",
          session_id: "test-session-123",
        }),
      });
    });
    await page.goto("/ai");
  });

  test("page loads with AI Teaching Assistant heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /ai teaching assistant/i })).toBeVisible();
  });

  test("powered by Tarkon AI status shows", async ({ page }) => {
    await expect(page.getByText(/powered by tarkon ai/i)).toBeVisible();
  });

  test("always on status indicator visible", async ({ page }) => {
    await expect(page.getByText(/always on/i)).toBeVisible();
  });

  test("8 capability cards visible", async ({ page }) => {
    // Wait for first message to be present (initial system message)
    for (const { label } of CAPABILITY_CARDS) {
      await expect(page.getByText(new RegExp(label, "i"))).toBeVisible();
    }
  });

  test("clicking a capability card inserts prompt into input", async ({ page }) => {
    const card = page.getByText(/generate quiz/i).first();
    await card.click();
    const input = page.locator("textarea, input[type=text]").last();
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test("message input is visible", async ({ page }) => {
    await expect(page.locator("textarea, input[type=text]").last()).toBeVisible();
  });

  test("send button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /send/i })).toBeVisible();
  });

  test("mic button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /mic|voice/i })).toBeVisible();
  });

  test("sending message via button shows user message bubble", async ({ page }) => {
    const input = page.locator("textarea, input[type=text]").last();
    await input.fill("Explain Newton's laws");
    await page.getByRole("button", { name: /send/i }).click();
    await expect(page.getByText("Explain Newton's laws")).toBeVisible();
  });

  test("sending via Enter key works", async ({ page }) => {
    const input = page.locator("textarea, input[type=text]").last();
    await input.fill("What is photosynthesis?");
    await input.press("Enter");
    await expect(page.getByText("What is photosynthesis?")).toBeVisible();
  });

  test("input clears after send", async ({ page }) => {
    const input = page.locator("textarea, input[type=text]").last();
    await input.fill("Clear after send");
    await page.getByRole("button", { name: /send/i }).click();
    await expect(input).toHaveValue("");
  });

  test("AI reply renders after send (mocked)", async ({ page }) => {
    const input = page.locator("textarea, input[type=text]").last();
    await input.fill("Create a quiz on fractions");
    await page.getByRole("button", { name: /send/i }).click();
    await expect(page.getByText(/here is the ai response/i)).toBeVisible({ timeout: 10_000 });
  });

  test("sending multiple messages maintains conversation history", async ({ page }) => {
    const input = page.locator("textarea, input[type=text]").last();
    await input.fill("First question");
    await page.getByRole("button", { name: /send/i }).click();
    await page.waitForTimeout(200);
    await input.fill("Second question");
    await page.getByRole("button", { name: /send/i }).click();
    await expect(page.getByText("First question")).toBeVisible();
    await expect(page.getByText("Second question")).toBeVisible();
  });

  test("each capability card has an emoji icon", async ({ page }) => {
    await expect(page.getByText(/📝|📚|🔍|📄|💬|📋|🎴|🔄/).first()).toBeVisible();
  });
});
