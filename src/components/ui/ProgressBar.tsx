"use client";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0–100
  variant?: "blue" | "green" | "amber" | "red" | "purple";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  variant = "blue",
  size = "md",
  showLabel,
  animated,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const trackColors = {
    blue: "bg-primary-100",
    green: "bg-emerald-100",
    amber: "bg-amber-100",
    red: "bg-red-100",
    purple: "bg-purple-100",
  };
  const fillColors = {
    blue: "bg-primary",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    purple: "bg-purple-600",
  };
  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };

  return (
    <div className={cn("w-full flex items-center gap-2", className)}>
      <div className={cn("flex-1 rounded-full overflow-hidden", trackColors[variant], heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            fillColors[variant],
            animated && "animate-pulse-soft"
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-caption font-semibold text-text-secondary w-8 text-right">{clamped}%</span>
      )}
    </div>
  );
}
