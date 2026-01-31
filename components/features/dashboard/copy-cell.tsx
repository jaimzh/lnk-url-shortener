"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../../ui/button";

export function CopyCell({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the Link from triggering if you click the button
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group/copy w-fit flex items-center justify-center gap-3 mx-auto p-1 rounded-md transition-all duration-300">
      {/* The Actual Link */}
      <Link
        href={text}
        target="_blank"
        className="text-text-muted font-mono text-xs hover:text-accent transition-colors duration-300"
        title={text}
      >
        {text.replace(/^https?:\/\//, "")}{" "}
        {/* Optional: cleans up the UI by hiding http:// */}
      </Link>

      {/* The Copy Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-text-muted/40 hover:text-accent hover:bg-transparent"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
}
