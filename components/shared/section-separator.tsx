import React from "react";
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  label?: string;
  className?: string;
}

export function SectionSeparator({ label, className }: SectionSeparatorProps) {
  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto px-6 py-8 flex items-center gap-6 select-none",
        className,
      )}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary/50" />
      {label && (
        <span className="text-xl md:text-2xl font-bold tracking-tight text-text-muted">
          {label}
        </span>
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary/50" />
    </div>
  );
}
