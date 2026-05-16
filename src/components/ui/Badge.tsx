"use client";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "amber" | "red" | "purple" | "gray";
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = "blue", dot, className }: BadgeProps) {
  const variants = {
    blue: "bg-primary-100 text-primary",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-slate-100 text-slate-600",
  };
  const dots = {
    blue: "bg-primary",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    purple: "bg-purple-600",
    gray: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-caption font-semibold",
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dots[variant])} />}
      {children}
    </span>
  );
}

interface CountBadgeProps {
  count: number;
  variant?: "primary" | "red" | "amber";
  className?: string;
}

export function CountBadge({ count, variant = "red", className }: CountBadgeProps) {
  if (count === 0) return null;
  const variants = {
    primary: "bg-primary",
    red: "bg-red-500",
    amber: "bg-amber-500",
  };
  return (
    <span
      className={cn(
        "min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold text-white flex items-center justify-center",
        variants[variant],
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
