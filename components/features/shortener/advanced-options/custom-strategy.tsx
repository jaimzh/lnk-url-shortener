import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn, getDisplayDomain } from "@/lib/utils";

interface CustomStrategyProps {
  customAlias: string;
  setCustomAlias: (alias: string) => void;
}

export const CustomStrategy = ({
  customAlias,
  setCustomAlias,
}: CustomStrategyProps) => {
  const [domain, setDomain] = useState("snappy.li");

  useEffect(() => {
    setDomain(getDisplayDomain());
  }, []);

  const isValid =
    !customAlias ||
    /^[\w\-.\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u.test(
      customAlias,
    );

  return (
    <motion.div
      key="custom"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="space-y-4 pt-2"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-accent/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div
          className={cn(
            "relative flex items-center bg-bg-base/60 backdrop-blur-sm rounded-xl border px-4 h-14 transition-all focus-within:bg-bg-base/80",
            !isValid
              ? "border-red-500/30 bg-red-500/[0.02]"
              : customAlias
                ? "border-accent/20"
                : "border-white/5 focus-within:border-accent/30",
          )}
        >
          <span className="text-text-muted/50 font-mono text-xs mr-1 select-none shrink-0 transition-colors group-focus-within:text-text-muted/70">
            {domain}/
          </span>
          <input
            type="text"
            value={customAlias}
            maxLength={50}
            onChange={(e) => {
              const val = e.target.value.replace(/\s+/g, "-");
              setCustomAlias(val);
            }}
            placeholder="custom-link"
            className="bg-transparent outline-none w-full text-text-base font-mono text-sm md:text-base font-bold placeholder:font-normal placeholder:text-text-muted/20"
            autoFocus
          />

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[8px] font-mono transition-colors",
                customAlias.length > 40
                  ? "text-yellow-500/40"
                  : "text-text-muted/10",
              )}
            >
              {customAlias.length}/50
            </span>
            {customAlias && (
              <button
                onClick={() => setCustomAlias("")}
                className="p-2 -mr-2 text-text-muted/50 hover:text-destructive transition-colors cursor-pointer shrink-0"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <p
        className={cn(
          "text-center text-[10px] uppercase tracking-widest font-medium transition-colors",
          !isValid ? "text-red-500/60" : "text-text-muted/40",
        )}
      >
        {!isValid
          ? "Use only letters, numbers, dashes, or emojis"
          : "Valid: a-z, 0-9, dash, emojis."}
      </p>
    </motion.div>
  );
};
