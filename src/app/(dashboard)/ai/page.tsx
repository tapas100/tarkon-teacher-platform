"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Mic, BookOpen, ClipboardList, Users, FileText, Brain, MessageCircle, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const CAPABILITY_CARDS = [
  { icon: "📝", label: "Generate Quiz", prompt: "Generate a quiz on fractions for Grade 5" },
  { icon: "📚", label: "Lesson Plan", prompt: "Create a lesson plan for photosynthesis Grade 6" },
  { icon: "🔍", label: "Find Weak Students", prompt: "Detect weak students in Grade 5A" },
  { icon: "📄", label: "Create Homework", prompt: "Create homework on algebra for Grade 7" },
  { icon: "💬", label: "Parent Feedback", prompt: "Generate parent feedback for Rahul Verma" },
  { icon: "📋", label: "Summarize Class", prompt: "Summarize today's Grade 5 maths class" },
  { icon: "🎴", label: "Flashcards", prompt: "Create flashcards for fractions" },
  { icon: "🔄", label: "Revision Plan", prompt: "Create a revision plan for upcoming exam" },
];

function ThinkingDots() {
  return (
    <div className="flex gap-1.5 p-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-purple-ai"
          style={{ animation: `thinking 1.4s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </div>
  );
}

export default function AIAssistantPage() {
  const { aiMessages, isAiThinking, sendAiMessage } = useAppStore();
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

  const isFirstMessage = aiMessages.length <= 1;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-border bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-3xl gradient-purple flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-page-header font-bold text-text-primary">AI Teaching Assistant</h1>
            <p className="text-emerald-500 text-caption font-medium">● Always on · Powered by Tarkon AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {isFirstMessage && (
          <>
            <div className="text-center py-4">
              <p className="text-text-secondary text-body">What would you like to do today?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {CAPABILITY_CARDS.map((card) => (
                <button
                  key={card.label}
                  onClick={() => sendAiMessage(card.prompt)}
                  className="card card-hover p-3 text-left flex flex-col gap-2 active:scale-95"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <p className="text-caption font-semibold text-text-primary">{card.label}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {aiMessages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "assistant" && (
              <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles size={16} className="text-white" />
              </div>
            )}
            <div className={cn("max-w-[75%] md:max-w-[65%]")}>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-body leading-relaxed whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white text-text-primary rounded-bl-sm shadow-card"
              )}>
                {msg.content}
              </div>
              {msg.role === "assistant" && (
                <div className="flex gap-2 mt-2">
                  <button className="text-[11px] px-2.5 py-1 rounded-xl bg-background text-text-secondary hover:text-primary font-medium">Copy</button>
                  <button className="text-[11px] px-2.5 py-1 rounded-xl bg-background text-text-secondary hover:text-primary font-medium">Save</button>
                  <button className="text-[11px] px-2.5 py-1 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium">Use This</button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAiThinking && (
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="bg-white shadow-card rounded-2xl rounded-bl-sm">
              <ThinkingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {!isFirstMessage && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {CAPABILITY_CARDS.slice(0, 5).map((c) => (
            <button key={c.label} onClick={() => sendAiMessage(c.prompt)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-caption font-medium hover:bg-purple-100">
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-border bg-white flex gap-2 pb-safe md:pb-4">
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask me anything — generate quiz, detect weak students, create lesson plan…"
            className="w-full px-4 py-3 pr-12 rounded-2xl bg-background border border-border text-body focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-purple-600">
            <Mic size={18} />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={isAiThinking || !input.trim()}
          className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center text-white flex-shrink-0 active:scale-95 transition-all disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
