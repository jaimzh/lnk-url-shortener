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
            "relative flex items-center bg-bg-base/60 backdrop-blur-sm rounded-xl border border-white/5 px-4 h-14 transition-all focus-within:border-accent/30 focus-within:bg-bg-base/80",
            customAlias && "border-accent/20",
          )}
        >
          <span className="text-text-muted/50 font-mono text-sm mr-1 select-none shrink-0 transition-colors group-focus-within:text-text-muted/70">
            {domain}/
          </span>
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="your-custom-alias"
            className="bg-transparent outline-none w-full text-text-base font-mono text-lg font-bold placeholder:font-normal placeholder:text-text-muted/20"
            autoFocus
          />

          {customAlias && (
            <button
              onClick={() => setCustomAlias("")}
              className="p-2 -mr-2 text-text-muted/50 hover:text-destructive transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-[10px] text-text-muted/40 uppercase tracking-widest font-medium">
        Valid: a-z, 0-9, emojis
      </p>
    </motion.div>
  );
};
