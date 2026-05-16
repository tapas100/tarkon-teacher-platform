import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStrengthColor(score: number): string {
  if (score >= 70) return "bg-emerald-400";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export function getStrengthLabel(score: number): "strong" | "medium" | "weak" {
  if (score >= 70) return "strong";
  if (score >= 40) return "medium";
  return "weak";
}

export function getRiskColor(score: number): string {
  if (score < 30) return "text-emerald-600 bg-emerald-50";
  if (score < 60) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

export function getSeverityColor(severity: "critical" | "medium" | "low"): {
  bg: string;
  text: string;
  dot: string;
} {
  const map = {
    critical: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
    medium: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
    low: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400" },
  };
  return map[severity];
}

export function getAvatarUrl(name: string, size = 40): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=DBEAFE&color=2563EB&bold=true`;
}
