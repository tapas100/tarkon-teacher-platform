"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ hover, padding = "md", className, children, ...props }: CardProps) {
  const pads = { none: "", sm: "p-3", md: "p-4", lg: "p-6" };
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-card",
        pads[padding],
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient: string;
  padding?: "sm" | "md" | "lg";
}

export function GradientCard({ gradient, padding = "md", className, children, ...props }: GradientCardProps) {
  const pads = { sm: "p-3", md: "p-4", lg: "p-6" };
  return (
    <div
      className={cn("rounded-3xl text-white", gradient, pads[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}
