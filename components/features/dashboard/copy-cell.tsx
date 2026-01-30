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
    <div className="group/copy w-fit flex items-center justify-center gap-2 mx-auto">
      {/* The Actual Link */}
      <Link
        href={text}
        target="_blank"
        className="text-text-base font-mono text-sm hover:underline truncate transition-colors"
        title={text}
      >
        {text.replace(/^https?:\/\//, "")}{" "}
        {/* Optional: cleans up the UI by hiding http:// */}
      </Link>

      {/* The Copy Button */}
      <Button
        variant="ghost"
        className="h-8 w-8 text-text-muted foreground"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
}
