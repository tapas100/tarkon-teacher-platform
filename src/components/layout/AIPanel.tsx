"use client";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { X, Sparkles, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const QUICK_PROMPTS = [
  "Generate a quiz on fractions",
  "Detect weak students in Grade 5",
  "Create homework for tomorrow",
  "Make a lesson plan",
];

function AIThinkingDots() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
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

export default function AIPanel() {
  const { isAiPanelOpen, toggleAiPanel, aiMessages, isAiThinking, sendAiMessage } =
    useAppStore();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, isAiThinking]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendAiMessage(input.trim());
    setInput("");
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed right-0 top-0 h-screen bg-white border-l border-border z-40",
        "transition-all duration-300 shadow-sidebar",
        isAiPanelOpen ? "w-[320px]" : "w-0 overflow-hidden border-l-0"
      )}
    >
      {isAiPanelOpen && (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 h-16 border-b border-border flex-shrink-0">
            <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[15px] text-text-primary">AI Assistant</p>
              <p className="text-[11px] text-emerald-500 font-medium">● Online</p>
            </div>
            <button
              onClick={toggleAiPanel}
              className="w-8 h-8 rounded-xl bg-background flex items-center justify-center text-text-secondary hover:text-primary"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
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
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendAiMessage(p)}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask anything…"
              className="flex-1 px-3.5 py-2.5 rounded-2xl bg-background border border-border text-caption focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0 hover:opacity-90 active:scale-95 transition-all"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
