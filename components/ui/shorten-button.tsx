"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function ShortenButton({
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ShortenButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "relative group flex items-center justify-center gap-2 px-2 md:px-6 py-3 rounded-full overflow-hidden transition-all duration-200 ease-out active:scale-95",
        "bg-accent text-text-base font-semibold",
        "border-t border-white/20",
        "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]",
        "hover:brightness-110",
        "min-w-[44px] md:min-w-[140px]",
        className,
      )}
      {...props}
    >
      {/* Glossy Overlay */}
      <span className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <span className="uppercase text-sm tracking-wide hidden md:block">
              Wait...
            </span>
            <div className="md:hidden w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </>
        ) : (
          <>
            <span className="uppercase text-sm tracking-wide hidden md:block">
              {children || "Shorten"}
            </span>
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="group-hover:translate-x-0.5 transition-transform shrink-0"
            />
          </>
        )}
      </span>
    </button>
  );
}
