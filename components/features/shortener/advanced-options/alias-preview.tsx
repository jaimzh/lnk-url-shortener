import React, { useEffect, useState } from "react";
import { getDisplayDomain } from "@/lib/utils";

interface AliasPreviewProps {
  alias: string;
  placeholder: string;
  onClear: () => void;
  label?: string;
}

export const AliasPreview = ({
  alias,
  placeholder,
  onClear,
  label = "Live Preview:",
}: AliasPreviewProps) => {
  const [domain, setDomain] = useState("snappy.li");

  useEffect(() => {
    setDomain(getDisplayDomain());
  }, []);

  return (
    <div className="flex items-center justify-between p-3 bg-bg-base/50 rounded-2xl border border-border animate-in fade-in slide-in-from-top-2 duration-300">
      <span className="text-text-muted text-[10px] uppercase font-bold shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-2 overflow-hidden px-4">
        <span className="text-text-muted font-mono text-xs whitespace-nowrap">
          {domain}/
        </span>
        <span className="text-text-base font-bold tracking-widest text-lg truncate">
          {alias || placeholder}
        </span>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="text-[10px] uppercase font-bold text-text-muted hover:text-accent transition-colors cursor-pointer shrink-0"
      >
        Clear
      </button>
    </div>
  );
};
