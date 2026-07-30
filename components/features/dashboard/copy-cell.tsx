"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

export function CopyCell({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group/copy w-fit flex items-center justify-center gap-3 mx-auto p-1 rounded-md transition-all duration-300">
      <Link
        href={text}
        target="_blank"
        className="text-text-muted font-mono text-xs hover:text-[color:var(--shortener-accent)] transition-colors duration-300"
        title={text}
      >
        {text.replace(/^https?:\/\//, "")}
      </Link>

      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-lg text-text-muted/40 transition-all duration-300 hover:bg-[color:var(--shortener-accent-soft)] hover:text-[color:var(--shortener-accent)]"
        onClick={handleCopy}
        title="Copy link"
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy link</span>
      </button>
    </div>
  );
}