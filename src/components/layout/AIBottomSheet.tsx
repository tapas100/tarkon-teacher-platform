"use client";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { X, Sparkles, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const QUICK_PROMPTS = [
  "Generate quiz",
  "Find weak students",
  "Create homework",
  "Make lesson plan",
  "Summarize class",
  "Parent feedback",
];

function AIThinkingDots() {
  return (
    <div className="flex gap-1.5 items-center p-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-purple-ai"
          style={{ animation: `thinking 1.4s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

export default function AIBottomSheet() {
  const { isAiSheetOpen, toggleAiSheet, aiMessages, isAiThinking, sendAiMessage } =
    useAppStore();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAiSheetOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, isAiThinking, isAiSheetOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendAiMessage(input.trim());
    setInput("");
  };

  if (!isAiSheetOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 md:hidden"
        onClick={toggleAiSheet}
      />
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-4xl shadow-card-elevated flex flex-col max-h-[85vh] animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[15px] text-text-primary">AI Teaching Assistant</p>
            <p className="text-[11px] text-emerald-500 font-medium">● Always ready</p>
          </div>
          <button
            onClick={toggleAiSheet}
            className="w-8 h-8 rounded-xl bg-background flex items-center justify-center text-text-secondary"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {aiMessages.slice(-6).map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-caption leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-purple-50 text-text-primary rounded-bl-sm border border-purple-100"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="flex justify-start">
              <div className="bg-purple-50 border border-purple-100 rounded-2xl rounded-bl-sm">
                <AIThinkingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendAiMessage(p)}
              className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-medium hover:bg-purple-100"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2 pb-safe">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask anything…"
            className="flex-1 px-3.5 py-2.5 rounded-2xl bg-background border border-border text-caption focus:outline-none focus:ring-2 focus:ring-purple-300"
            autoFocus
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0 active:scale-95"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
