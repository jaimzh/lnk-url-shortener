"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SHORTENER_MODES,
  ShortenerMode,
} from "@/components/features/shortener/advanced-options/constants";
import { getShortenerModeStyle } from "@/components/features/shortener/mode-theme";

interface ShortenerThemeContextValue {
  mode: ShortenerMode;
  setMode: (mode: ShortenerMode) => void;
}

const ShortenerThemeContext = createContext<ShortenerThemeContextValue | null>(
  null,
);

interface ShortenerThemeProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function ShortenerThemeProvider({
  children,
  className,
}: ShortenerThemeProviderProps) {
  const [mode, setMode] = useState<ShortenerMode>(SHORTENER_MODES.LINK);
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ShortenerThemeContext.Provider value={value}>
      <div className={cn("w-full", className)} style={getShortenerModeStyle(mode)}>
        {children}
      </div>
    </ShortenerThemeContext.Provider>
  );
}

export function useShortenerTheme() {
  const context = useContext(ShortenerThemeContext);

  if (!context) {
    throw new Error("useShortenerTheme must be used inside ShortenerThemeProvider");
  }

  return context;
}