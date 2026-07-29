"use client";

import React from "react";
import { motion } from "motion/react";
import { Cloud, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SHORTENER_MODES,
  ShortenerMode,
} from "@/components/features/shortener/advanced-options/constants";

interface ModeSwitcherProps {
  mode: ShortenerMode;
  onModeChange: (mode: ShortenerMode) => void;
}

const modes = [
  {
    id: SHORTENER_MODES.LINK,
    label: "Link",
    icon: Link2,
  },
  {
    id: SHORTENER_MODES.CDN,
    label: "CDN",
    icon: Cloud,
  },
] as const;

export function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex justify-center pt-4 pb-2 ">
      <div className="grid w-full max-w-xs grid-cols-2 gap-8">
        {modes.map((item) => {
          const Icon = item.icon;
          const isActive = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onModeChange(item.id)}
              className={cn(
                "relative flex h-8 items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors outline-none cursor-pointer focus-visible:text-[color:var(--shortener-mode-text)] sm:text-xs",
                isActive
                  ? "text-[color:var(--shortener-mode-text)]"
                  : "text-text-muted/40 hover:text-text-muted",
              )}
            >
              <span className="flex items-center gap-2">
                <Icon size={13} strokeWidth={1.7} />
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="shortener-mode-underline"
                  className="absolute bottom-0 h-px w-full bg-[color:var(--shortener-accent)]"
                  transition={{ type: "spring", bounce: 0.16, duration: 0.45 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}