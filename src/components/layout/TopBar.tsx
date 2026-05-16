"use client";
import { Bell, Sparkles, Search } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { Avatar } from "@/components/ui/Avatar";
import { CountBadge } from "@/components/ui/Badge";
import { TEACHER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showGreeting?: boolean;
}

export default function TopBar({ title, subtitle, showGreeting }: TopBarProps) {
  const { unreadCount, isSidebarCollapsed, notifications, markAllRead, toggleAiSheet } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const greetingEmoji = hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 h-16 z-30 flex items-center gap-3 px-6",
          "bg-white/80 backdrop-blur-xl border-b border-slate-200/80",
          "transition-all duration-300",
          isSidebarCollapsed ? "left-[72px]" : "left-[260px]"
        )}
      >
        {/* Left — greeting or page title */}
        <div className="flex-1 min-w-0">
          {showGreeting ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{greetingEmoji}</span>
              <div>
                <p className="text-[15px] font-semibold text-slate-800 leading-tight">
                  {greeting},{" "}
                  <span className="text-blue-600">{TEACHER.name.split(" ")[0]} Ma&apos;am</span>
                </p>
                <p className="text-[12px] text-slate-400 font-medium">{TEACHER.school}</p>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="font-bold text-[17px] text-slate-900 truncate">{title}</h1>
              {subtitle && <p className="text-[12px] text-slate-400">{subtitle}</p>}
            </div>
          )}
        </div>

        {/* Search bar — desktop only */}
        <div className="hidden lg:flex items-center gap-2 w-56 bg-slate-100 rounded-xl px-3 py-2 text-[13px] text-slate-400 cursor-pointer hover:bg-slate-200 transition-colors">
          <Search size={14} />
          <span>Search anything…</span>
          <kbd className="ml-auto text-[11px] bg-white border border-slate-200 rounded px-1 py-0.5 font-mono text-slate-400">⌘K</kbd>
        </div>

        {/* AI Button — mobile only */}
        <button
          onClick={toggleAiSheet}
          className="md:hidden w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md"
        >
          <Sparkles size={16} className="text-white" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead(); }}
            className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <CountBadge count={unreadCount} className="absolute -top-1 -right-1" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-[14px] text-slate-800">Notifications</h3>
                <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className={cn(
                    "px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer",
                    !n.read && "bg-blue-50/60"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                        n.type === "critical" ? "bg-red-500" : n.type === "medium" ? "bg-amber-500" : "bg-blue-400"
                      )} />
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">{n.title}</p>
                        <p className="text-[12px] text-slate-500 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Avatar */}
        <Link href="/settings" className="flex items-center gap-2.5 group">
          <Avatar name={TEACHER.name} size="sm" />
          <div className="hidden xl:block">
            <p className="text-[13px] font-semibold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">{TEACHER.name}</p>
            <p className="text-[11px] text-slate-400">Teacher</p>
          </div>
        </Link>
      </header>

      {/* Overlay */}
      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}
    </>
  );
}
