"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, MessageCircle, BookOpen, ClipboardList,
  FileText, Users, BarChart2, Sparkles, Megaphone,
  Users2, FolderOpen, Settings, ChevronLeft, ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const NAV_GROUPS = [
  {
    label: "Core",
    items: [
      { href: "/home", label: "Dashboard", icon: LayoutDashboard },
      { href: "/chats", label: "Chats", icon: MessageCircle },
      { href: "/classes", label: "Classes", icon: BookOpen },
    ],
  },
  {
    label: "Academics",
    items: [
      { href: "/assignments", label: "Assignments", icon: ClipboardList },
      { href: "/exams", label: "Exams", icon: FileText },
      { href: "/students", label: "Students", icon: Users },
      { href: "/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/ai", label: "AI Assistant", icon: Sparkles, highlight: true },
      { href: "/announcements", label: "Announcements", icon: Megaphone },
      { href: "/parents", label: "Parents", icon: Users2 },
      { href: "/resources", label: "Resources", icon: FolderOpen },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 h-screen z-40",
        "transition-all duration-300 ease-in-out",
        "bg-[#0F172A]",
        isSidebarCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex items-center h-16 flex-shrink-0 border-b border-white/[0.06]",
        isSidebarCollapsed ? "px-4 justify-center" : "px-5 gap-3"
      )}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
          <GraduationCap size={16} className="text-white" />
        </div>
        {!isSidebarCollapsed && (
          <div className="min-w-0">
            <p className="font-bold text-[15px] text-white leading-tight">Tarkon</p>
            <p className="text-[11px] text-white/40 font-medium tracking-wide uppercase">Teacher Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto no-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-1">
            {!isSidebarCollapsed && (
              <p className="px-5 pt-3 pb-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/25 select-none">
                {group.label}
              </p>
            )}
            {isSidebarCollapsed && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}
            <ul className="space-y-0.5 px-2">
              {group.items.map(({ href, label, icon: Icon, highlight }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      title={isSidebarCollapsed ? label : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative",
                        active
                          ? "bg-white/10 text-white"
                          : highlight
                          ? "text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                          : "text-white/50 hover:bg-white/[0.06] hover:text-white/90",
                        isSidebarCollapsed && "justify-center px-0"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-blue-400" />
                      )}
                      <Icon size={18} className={cn("flex-shrink-0", highlight && !active && "text-purple-400")} />
                      {!isSidebarCollapsed && (
                        <span className="text-[14px] font-medium truncate">{label}</span>
                      )}
                      {!isSidebarCollapsed && highlight && (
                        <span className="ml-auto text-[10px] font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-md">AI</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className={cn(
        "flex items-center p-3 border-t border-white/[0.06]",
        isSidebarCollapsed ? "justify-center" : "justify-end"
      )}>
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-150"
        >
          {isSidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
    </aside>
  );
}
