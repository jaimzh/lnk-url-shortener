"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALIAS_STRATEGIES, AliasStrategy, RandomFlavor } from "./constants";

import { StrategySelector } from "./strategy-selector";
import { RandomStrategy } from "./random-strategy";
import { CustomStrategy } from "./custom-strategy";

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  aliasType: AliasStrategy;
  setAliasType: (type: AliasStrategy) => void;
  customAlias: string;
  setCustomAlias: (alias: string) => void;
  randomFlavor: RandomFlavor;
  setRandomFlavor: (flavor: RandomFlavor) => void;
  randomPreview: string;
  onRegenerate: () => void;
}

export function AdvancedOptions({
  showAdvanced,
  setShowAdvanced,
  aliasType,
  setAliasType,
  customAlias,
  setCustomAlias,
  randomFlavor,
  setRandomFlavor,
  randomPreview,
  onRegenerate,
}: AdvancedOptionsProps) {
  return (
    <div className="space-y-2 pt-2">
      {/* Advanced Options Toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "group flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold  tracking-widest transition-all cursor-pointer",
            showAdvanced
              ? "text-text-base bg-white/5"
              : "text-text-muted hover:text-text-base hover:bg-white/5",
          )}
        >
          <Settings2
            size={14}
            className={cn(
              "transition-transform duration-700",
              showAdvanced
                ? "rotate-180 text-text-base"
                : "group-hover:rotate-45",
            )}
          />
          <span>Advanced Options</span>
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-300 opacity-50",
              showAdvanced && "rotate-180 opacity-100",
            )}
          />
        </button>
      </div>

      {/* Advanced Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4">
              {/* Container for the options - reduced visual weight */}
              <div className="bg-bg-base/30 rounded-3xl p-6 border border-accent/50 backdrop-blur-sm">
                <div className="max-w-md mx-auto space-y-6">
                  <StrategySelector
                    aliasType={aliasType}
                    onStrategyChange={(type) => {
                      setAliasType(type);
                      setCustomAlias("");
                    }}
                  />

                  {/* Contextual Inputs */}
                  <div className="min-h-[100px]">
                    <AnimatePresence mode="wait">
                      {aliasType === ALIAS_STRATEGIES.RANDOM ? (
                        <RandomStrategy
                          randomFlavor={randomFlavor}
                          setRandomFlavor={setRandomFlavor}
                          randomPreview={randomPreview}
                          onRegenerate={onRegenerate}
                        />
                      ) : (
                        <CustomStrategy
                          customAlias={customAlias}
                          setCustomAlias={setCustomAlias}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
