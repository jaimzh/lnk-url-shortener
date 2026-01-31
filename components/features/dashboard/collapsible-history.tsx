"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CollapsibleHistoryProps {
  label: string;
  children: React.ReactNode;
}

export function CollapsibleHistory({
  label,
  children,
}: CollapsibleHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full max-w-4xl mx-auto px-6 py-8 flex items-center gap-6 cursor-pointer group select-none"
      >
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary/50 group-hover:via-accent group-hover:to-accent transition-colors duration-500" />

        <div className="flex items-center gap-3 text-text-muted group-hover:text-accent transition-colors duration-300">
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            {label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </div>

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary/50 group-hover:via-accent group-hover:to-accent transition-colors duration-500" />
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
