/**
 * Teacher AI Service
 *
 * Sends teacher prompts to the Tarkon AI pipeline:
 *   Teacher Platform → /api/teacher-ai (Next.js proxy)
 *     → tarkon-core-api /tutor/ask
 *       → tarkon-ai-orchestrator
 *
 * Falls back to a structured mock response on any error so the UI
 * never breaks during local development without the backend running.
 */

export interface TeacherAIRequest {
  prompt: string;
  /** Teacher's primary subject for context, e.g. "Mathematics" */
  subject?: string;
  /** Grade currently being taught, e.g. "5" */
  grade?: string;
  /** Arbitrary extra context injected into the system prompt */
  context?: string;
  /** Continuing conversation session */
  sessionId?: string;
}

export interface TeacherAIResponse {
  answer: string;
  sessionId: string;
  usedMock: boolean;
}

// ── Mock answers for offline / no-backend dev ────────────────────────────────

const MOCK_RESPONSES: Record<string, string> = {
  quiz: "✅ **Quiz generated** — 10 questions on this topic for your grade, balanced across recall, application, and analysis levels. Want me to adjust difficulty or question types?",
  homework: "📝 **Homework created** — 8 problems aligned to this week's weak concepts. Estimated student completion time: 25 min. Ready to publish?",
  weak: "🔍 **Weak Student Analysis:**\nBased on recent performance, 3 students show significant gaps. I can generate targeted remedial worksheets for each. Shall I?",
  lesson: "📚 **Lesson Plan ready** — 5-phase structure (warm-up → concept → activity → practice → exit ticket) fully aligned to the curriculum outcome. Save to resources?",
  flashcard: "🎴 **Flashcards created** — 12 cards covering key terms and definitions. Available for student self-study in the app.",
  revision: "🔄 **Revision Plan** — 7-day schedule prioritising lowest-scoring topics. Includes daily micro-quizzes and spaced repetition reminders.",
  feedback: "💬 **Parent feedback drafted** — personalised message highlighting strengths, areas to improve, and 2 actionable tips for home practice. Review before sending?",
  summarize: "📋 **Class Summary** — today's session covered 3 objectives. 82% engagement rate. 4 students needed extra support. Full report saved to analytics.",
};

function getMockAnswer(prompt: string): string {
  const lower = prompt.toLowerCase();
  const key = Object.keys(MOCK_RESPONSES).find((k) => lower.includes(k));
  return key
    ? MOCK_RESPONSES[key]
    : "I've analysed your request using student performance data and curriculum context. Here's my recommendation — would you like me to take action or elaborate further?";
}

// ── Real API call ─────────────────────────────────────────────────────────────

export async function sendTeacherMessage(
  req: TeacherAIRequest,
): Promise<TeacherAIResponse> {
  const MOCK_MODE = process.env.NEXT_PUBLIC_AI_MOCK !== "false";

  if (MOCK_MODE) {
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
    return { answer: getMockAnswer(req.prompt), sessionId: "mock-session", usedMock: true };
  }

  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("tarkon_token") : null;

    const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

    const res = await fetch(`${BASE}/tutor/ask?student_id=teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        question: req.prompt,
        subject: req.subject,
        grade_level: req.grade ? parseInt(req.grade, 10) : undefined,
        session_id: req.sessionId,
      }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    return {
      answer: data.answer,
      sessionId: data.session_id ?? "unknown",
      usedMock: false,
    };
  } catch (err) {
    console.warn("[teacher-ai] falling back to mock:", err);
    await new Promise((r) => setTimeout(r, 800));
    return { answer: getMockAnswer(req.prompt), sessionId: "fallback-session", usedMock: true };
  }
}
