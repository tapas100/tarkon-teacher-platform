"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, MessageCircle, BookOpen, ClipboardList, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { CountBadge } from "@/components/ui/Badge";

const BOTTOM_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/chats", label: "Chats", icon: MessageCircle, badge: 3 },
  { href: "/classes", label: "Classes", icon: BookOpen },
  { href: "/assignments", label: "Tasks", icon: ClipboardList },
  { href: "/ai", label: "AI", icon: Sparkles },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { unreadCount } = useAppStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-bottom z-40 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {BOTTOM_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const badgeCount = href === "/chats" ? unreadCount : badge ?? 0;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-150 relative",
                active ? "text-primary" : "text-text-secondary"
              )}
            >
              <div className="relative">
                <Icon size={22} className={cn("transition-all", active && "stroke-[2.5px]")} />
                {badgeCount > 0 && (
                  <CountBadge
                    count={badgeCount}
                    className="absolute -top-1.5 -right-1.5"
                  />
                )}
              </div>
              <span className={cn("text-[11px] font-medium", active && "font-semibold")}>{label}</span>
              {active && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
