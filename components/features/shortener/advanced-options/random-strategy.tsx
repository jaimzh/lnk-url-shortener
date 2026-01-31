import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RefreshCcw, Type, Smile, Hash, Zap } from "lucide-react";
import { cn, getDisplayDomain } from "@/lib/utils";
import { RANDOM_FLAVORS, RandomFlavor } from "./constants";

interface RandomStrategyProps {
  randomFlavor: RandomFlavor;
  setRandomFlavor: (flavor: RandomFlavor) => void;
  randomPreview: string;
  onRegenerate: () => void;
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
}: RandomStrategyProps) => {
  const [domain, setDomain] = useState("snappy.li");

  useEffect(() => {
    setDomain(getDisplayDomain());
  }, []);

  return (
    <motion.div
      key="random"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="space-y-6"
    >
      {/* Flavor Selection */}
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
                  ? "bg-accent/40 text-text-base"
                  : "text-text-muted hover:text-text-base hover:bg-white/5",
              )}
            >
              {flavorIcons[flavor.id]} {flavor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative group">
        <div className="absolute inset-0 bg-accent/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative flex items-center justify-between bg-bg-base/60 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/5 shadow-inner">
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="text-text-muted/50 font-mono text-sm shrink-0">
              {domain}/
            </span>
            <motion.span
              key={randomPreview}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-text-base font-mono font-bold text-base sm:text-lg tracking-wide truncate"
            >
              {randomPreview}
            </motion.span>
          </div>

          <button
            type="button"
            onClick={onRegenerate}
            className="p-2 -mr-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all cursor-pointer"
            title="Regenerate"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
