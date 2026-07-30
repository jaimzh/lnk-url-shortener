"use client";

import React from "react";
import { motion } from "motion/react";

interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({
  label = "Shortening Link...",
}: LoadingSpinnerProps) {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className="flex flex-col items-center justify-center gap-6 py-12 "
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <motion.span
          className="absolute w-full h-full border-4 border-[color:var(--shortener-accent-soft,var(--accent))] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          className="absolute w-full h-full border-t-4 border-[color:var(--shortener-accent,var(--accent))] rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-text-muted text-sm font-medium tracking-widest uppercase"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}