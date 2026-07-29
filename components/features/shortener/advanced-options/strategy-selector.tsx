import React from "react";
import { Dices, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALIAS_STRATEGIES, AliasStrategy } from "./constants";
import { motion } from "motion/react";

interface StrategySelectorProps {
  aliasType: AliasStrategy;
  onStrategyChange: (type: AliasStrategy) => void;
}

export const StrategySelector = ({
  aliasType,
  onStrategyChange,
}: StrategySelectorProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex bg-bg-base/50 backdrop-blur-sm p-1.5 rounded-full border border-border/40 relative">
        <button
          type="button"
          onClick={() => onStrategyChange(ALIAS_STRATEGIES.RANDOM)}
          className={cn(
            "relative px-4 sm:px-6 py-2 rounded-full transition-colors duration-300 font-medium text-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shortener-accent-border)]",
            aliasType === ALIAS_STRATEGIES.RANDOM
              ? "text-text-base"
              : "text-text-muted hover:text-text-base",
          )}
        >
          {aliasType === ALIAS_STRATEGIES.RANDOM && (
            <motion.div
              layoutId="strategy-bg"
              className="absolute inset-0 bg-[color:var(--shortener-accent-soft)] rounded-full shadow-[0_0_18px_var(--shortener-accent-faint)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Dices size={14} />
            <span>Random</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => onStrategyChange(ALIAS_STRATEGIES.CUSTOM)}
          className={cn(
            "relative px-4 sm:px-6 py-2 rounded-full transition-colors duration-300 font-medium text-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shortener-accent-border)]",
            aliasType === ALIAS_STRATEGIES.CUSTOM
              ? "text-text-base"
              : "text-text-muted hover:text-text-base",
          )}
        >
          {aliasType === ALIAS_STRATEGIES.CUSTOM && (
            <motion.div
              layoutId="strategy-bg"
              className="absolute inset-0 bg-[color:var(--shortener-accent-soft)] rounded-full shadow-[0_0_18px_var(--shortener-accent-faint)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={14} />
            <span>Custom</span>
          </span>
        </button>
      </div>
    </div>
  );
};
