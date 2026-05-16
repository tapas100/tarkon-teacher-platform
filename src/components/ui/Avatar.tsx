"use client";
import { cn, getInitials, getAvatarUrl } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  className?: string;
}

export function Avatar({ name, src, size = "md", online, className }: AvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-caption",
    md: "w-10 h-10 text-body",
    lg: "w-12 h-12 text-card-title",
    xl: "w-16 h-16 text-[20px]",
  };
  const px = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-semibold",
          sizes[size],
          !src && "bg-primary-100 text-primary"
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={px[size]}
            height={px[size]}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : (
          <Image
            src={getAvatarUrl(name, px[size])}
            alt={name}
            width={px[size]}
            height={px[size]}
            className="object-cover w-full h-full"
            unoptimized
          />
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white",
            online ? "bg-emerald-400" : "bg-slate-300"
          )}
        />
      )}
    </div>
  );
}
