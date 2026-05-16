import { create } from "zustand";
import type { Notification, AiMessage } from "@/types";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { sendTeacherMessage } from "@/services/teacher-ai.service";

interface AppStore {
  // Theme
  isDark: boolean;
  toggleDark: () => void;

  // Sidebar (desktop)
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // AI Panel (desktop)
  isAiPanelOpen: boolean;
  toggleAiPanel: () => void;

  // AI bottom sheet (mobile)
  isAiSheetOpen: boolean;
  toggleAiSheet: () => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;

  // AI Messages
  aiMessages: AiMessage[];
  isAiThinking: boolean;
  sendAiMessage: (content: string) => void;

  // Active chat thread
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  isDark: false,
  toggleDark: () => set((s) => ({ isDark: !s.isDark })),

  isSidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),

  isAiPanelOpen: false,
  toggleAiPanel: () => set((s) => ({ isAiPanelOpen: !s.isAiPanelOpen })),

  isAiSheetOpen: false,
  toggleAiSheet: () => set((s) => ({ isAiSheetOpen: !s.isAiSheetOpen })),

  notifications: NOTIFICATIONS,
  unreadCount: NOTIFICATIONS.filter((n) => !n.read).length,
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  aiMessages: [
    {
      id: "ai-0",
      role: "assistant",
      content:
        "Hello Ananya Ma'am! 👋 I'm your AI teaching assistant. I can help you generate quizzes, create homework, detect weak students, explain concepts, make lesson plans, and much more. What would you like to do today?",
      timestamp: new Date().toISOString(),
    },
  ],
  isAiThinking: false,
  sendAiMessage: (content: string) => {
    const userMsg: AiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({
      aiMessages: [...s.aiMessages, userMsg],
      isAiThinking: true,
    }));

    sendTeacherMessage({ prompt: content, subject: "General" })
      .then((res) => {
        const reply: AiMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: res.answer,
          timestamp: new Date().toISOString(),
        };
        set((s) => ({ aiMessages: [...s.aiMessages, reply], isAiThinking: false }));
      })
      .catch(() => {
        const reply: AiMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date().toISOString(),
        };
        set((s) => ({ aiMessages: [...s.aiMessages, reply], isAiThinking: false }));
      });
  },

  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
}));
