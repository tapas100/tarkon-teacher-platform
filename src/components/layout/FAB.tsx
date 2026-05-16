"use client";
import { Plus, BookOpen, MessageCircle, FileText, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

const FAB_ACTIONS = [
  { label: "Create Assignment", icon: FileText, href: "/assignments/create", color: "bg-amber-500" },
  { label: "Message Class", icon: MessageCircle, href: "/chats", color: "bg-emerald-500" },
  { label: "Start Class", icon: BookOpen, href: "/classes", color: "bg-primary" },
  { label: "Ask AI", icon: Sparkles, color: "bg-purple-ai", isAi: true },
];

export default function FAB() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggleAiSheet } = useAppStore();

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 flex flex-col items-end gap-2">
      {/* Sub actions */}
      {open && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-slide-up">
          {FAB_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setOpen(false);
                if (action.isAi) { toggleAiSheet(); }
                else if (action.href) { router.push(action.href); }
              }}
              className="flex items-center gap-2 animate-fade-in"
            >
              <span className="bg-white text-text-primary text-caption font-semibold px-3 py-1.5 rounded-2xl shadow-card">
                {action.label}
              </span>
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-white shadow-card",
                  action.color
                )}
              >
                <action.icon size={20} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-card-elevated transition-all duration-200 active:scale-95",
          open ? "bg-slate-700 rotate-45" : "bg-primary shadow-primary"
        )}
      >
        <Plus size={24} />
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />}
    </div>
  );
}
