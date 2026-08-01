import React, { useState } from "react";
import { motion } from "motion/react";
import { RefreshCcw, Type, Smile, Hash, Zap } from "lucide-react";
import { cn, getDisplayDomain } from "@/lib/utils";
import { RANDOM_FLAVORS, RandomFlavor } from "./constants";

interface RandomStrategyProps {
  randomFlavor: RandomFlavor;
  setRandomFlavor: (flavor: RandomFlavor) => void;
  randomPreview: string;
  onRegenerate: () => void;
  displayPrefix?: string;
  showFlavorSelector?: boolean;
}

const flavorIcons: Record<string, React.ReactNode> = {
  text: <Type size={14} />,
  emoji: <Smile size={14} />,
  kaomoji: <Hash size={14} />,
  mix: <Zap size={14} />,
};

export const RandomStrategy = ({
  randomFlavor,
  setRandomFlavor,
  randomPreview,
  onRegenerate,
  displayPrefix,
  showFlavorSelector = true,
}: RandomStrategyProps) => {
  const [domain] = useState(() => getDisplayDomain());

  return (
    <motion.div
      key="random"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className={cn(showFlavorSelector ? "space-y-6" : "space-y-4 pt-2")}
    >
      {showFlavorSelector && (
        <div className="flex justify-center w-full">
          <div className="flex flex-wrap justify-center p-1 bg-bg-base/30 rounded-xl gap-1 max-w-full">
            {RANDOM_FLAVORS.map((flavor) => (
              <button
                key={flavor.id}
                type="button"
                onClick={() => setRandomFlavor(flavor.id as RandomFlavor)}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex-grow sm:flex-grow-0",
                  randomFlavor === flavor.id
                    ? "bg-[color:var(--shortener-accent-soft)] text-text-base"
                    : "text-text-muted hover:text-text-base hover:bg-white/5",
                )}
              >
                {flavorIcons[flavor.id]} {flavor.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative group">
        <div className="absolute inset-0 bg-[color:var(--shortener-accent-faint)] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative flex h-14 items-center justify-between rounded-xl border border-white/5 bg-bg-base/60 px-4 backdrop-blur-sm transition-all shadow-inner">
          <div className="flex min-w-0 items-center gap-1 overflow-hidden">
            <span className="mr-1 shrink-0 select-none font-mono text-xs text-text-muted/50">
              {displayPrefix ?? `${domain}/`}
            </span>
            <motion.span
              key={randomPreview}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="truncate font-mono text-sm font-bold text-text-base md:text-base"
            >
              {randomPreview}
            </motion.span>
          </div>

          <button
            type="button"
            onClick={onRegenerate}
            className="-mr-2 shrink-0 rounded-lg p-2 text-text-muted/50 transition-colors hover:bg-[color:var(--shortener-accent-soft)] hover:text-[color:var(--shortener-accent)] cursor-pointer"
            title="Regenerate"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

