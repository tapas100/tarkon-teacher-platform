"use client";
import { useState } from "react";
import { Search, Filter, Phone, Video, Sparkles, Send, Mic, Paperclip, MoreVertical, ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, CountBadge } from "@/components/ui/Badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import { CHAT_THREADS, MESSAGES } from "@/lib/mock-data";
import type { ChatThread } from "@/types";

const CATEGORY_FILTERS = ["All", "Classes", "Parents", "Students", "AI", "Announcements"];

const TYPE_LABELS: Record<string, string> = {
  "class-group": "Class",
  "subject-group": "Subject",
  "student-dm": "Student",
  "parent-dm": "Parent",
  "ai": "AI",
  "announcement": "School",
  "homework": "Homework",
  "exam": "Exam",
};

function ChatListItem({ thread, active, onClick }: { thread: ChatThread; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-background",
        active && "bg-primary-50 border-r-2 border-primary"
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar name={thread.name} size="md" online={thread.isOnline} />
        {thread.type === "ai" && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full gradient-purple flex items-center justify-center">
            <Sparkles size={8} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={cn("font-semibold text-body truncate", active ? "text-primary" : "text-text-primary")}>
            {thread.name}
          </p>
          <span className="text-[11px] text-text-secondary ml-2 flex-shrink-0">
            {formatRelativeTime(thread.lastMessageTime)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-caption text-text-secondary truncate">{thread.lastMessage}</p>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {thread.hasAiAlert && (
              <div className="w-4 h-4 rounded-full gradient-purple flex items-center justify-center">
                <Sparkles size={8} className="text-white" />
              </div>
            )}
            <CountBadge count={thread.unreadCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationView({ thread, onBack }: { thread: ChatThread; onBack: () => void }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border bg-white flex-shrink-0">
        <button onClick={onBack} className="md:hidden mr-1 text-text-secondary">
          <ArrowLeft size={22} />
        </button>
        <Avatar name={thread.name} size="sm" online={thread.isOnline} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-body text-text-primary truncate">{thread.name}</p>
          <p className="text-[11px] text-text-secondary">
            {thread.isOnline ? "● Online" : TYPE_LABELS[thread.type]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Search size={18} />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Phone size={18} />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Sparkles size={18} />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {/* Date divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] text-text-secondary bg-slate-50 px-2">Today</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {MESSAGES.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2", msg.isTeacher ? "justify-end" : "justify-start")}>
            {!msg.isTeacher && <Avatar name={msg.senderName} size="sm" className="mt-1 flex-shrink-0" />}
            <div className={cn("max-w-[75%]")}>
              {!msg.isTeacher && (
                <p className="text-[11px] text-text-secondary font-medium mb-1 ml-1">{msg.senderName}</p>
              )}
              <div
                className={cn(
                  "px-4 py-2.5 rounded-2xl text-body leading-relaxed",
                  msg.isTeacher
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white text-text-primary rounded-bl-sm shadow-card"
                )}
              >
                {msg.content}
              </div>
              <p className={cn("text-[11px] mt-1 text-text-secondary", msg.isTeacher && "text-right")}>
                {formatRelativeTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* AI summarize banner */}
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-2xl px-3 py-2">
          <Sparkles size={14} className="text-purple-600" />
          <p className="text-caption text-purple-700 font-medium flex-1">AI Summary: Doubt clarification on fractions for Q4</p>
          <button className="text-[11px] text-purple-600 font-semibold">View</button>
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-white flex items-center gap-2">
        <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary">
          <Paperclip size={18} />
        </button>
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setInput("")}
            placeholder="Type a message…"
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <button className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary">
          <Mic size={18} />
        </button>
        <button
          onClick={() => setInput("")}
          className="w-10 h-10 rounded-2xl gradient-blue flex items-center justify-center text-white flex-shrink-0 active:scale-95 transition-all"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default function ChatsPage() {
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CHAT_THREADS.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchesSearch;
    if (filter === "Classes") return matchesSearch && (t.type === "class-group" || t.type === "subject-group");
    if (filter === "Parents") return matchesSearch && t.type === "parent-dm";
    if (filter === "Students") return matchesSearch && t.type === "student-dm";
    if (filter === "AI") return matchesSearch && t.type === "ai";
    if (filter === "Announcements") return matchesSearch && t.type === "announcement";
    return matchesSearch;
  });

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Chat List */}
      <div
        className={cn(
          "w-full md:w-[340px] flex-shrink-0 flex flex-col bg-white border-r border-border",
          activeThread && "hidden md:flex"
        )}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <h1 className="text-page-header font-bold text-text-primary mb-3">Chats</h1>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats…"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 text-body transition-all outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar border-b border-border">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-2xl text-caption font-semibold transition-all",
                filter === f ? "bg-primary text-white" : "bg-background text-text-secondary hover:text-text-primary"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((thread) => (
            <ChatListItem
              key={thread.id}
              thread={thread}
              active={activeThread?.id === thread.id}
              onClick={() => setActiveThread(thread)}
            />
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className={cn("flex-1 flex flex-col", !activeThread && "hidden md:flex items-center justify-center bg-background")}>
        {activeThread ? (
          <ConversationView thread={activeThread} onBack={() => setActiveThread(null)} />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-3xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-primary" />
            </div>
            <h3 className="text-card-title font-semibold text-text-primary mb-2">Select a Conversation</h3>
            <p className="text-text-secondary text-body">Choose a chat from the list to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
