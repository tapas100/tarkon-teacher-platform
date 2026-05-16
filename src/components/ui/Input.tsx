"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
}

export function Input({ icon, iconRight, error, label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-caption font-semibold text-text-primary mb-1.5">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">{icon}</span>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 rounded-2xl border border-border bg-surface text-text-primary",
            "placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            "transition-all duration-200 text-body",
            icon && "pl-10",
            iconRight && "pr-10",
            error && "border-red-400 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary">{iconRight}</span>
        )}
      </div>
      {error && <p className="mt-1 text-caption text-red-500">{error}</p>}
    </div>
  );
}

export function SearchInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      icon={<Search size={16} />}
      placeholder="Search…"
      className={cn("bg-background border-transparent focus:bg-white", className)}
      {...props}
    />
  );
}
