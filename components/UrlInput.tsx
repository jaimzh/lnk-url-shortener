"use client";

import React, { useState } from "react";
import { Link2, ArrowRight } from "lucide-react";

type UrlInputProps = {
  onShorten?: (url: string) => void | Promise<void>;
  tagline?: string;
  className?: string;
};

export default function UrlInput({
  onShorten,
  tagline = "Precision • Analytics • Privacy",
  className = "",
}: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    if (onShorten) await onShorten(trimmed);
    else console.log("Shortening:", trimmed);
  };

  return (
    <div className={`relative w-full max-w-3xl ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="group flex items-center justify-between h-14 md:h-20 w-full rounded-full border border-white/5 bg-white/3 backdrop-blur-2xl transition-all focus-within:border-accent/40 shadow-2xl p-1 md:p-2 relative focus-within:">
        <form
          onSubmit={handleShorten}
          className="flex items-center w-full h-full"
        >
          <div className="flex items-center flex-1 pl-3.5 md:pl-6 pr-2 md:pr-4 gap-2.5 md:gap-4 min-w-0">
            <Link2
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-text-muted transition-colors group-focus-within:text-accent md:w-5 md:h-5"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the link here"
              aria-label="URL input"
              className="w-full min-w-0 bg-transparent text-text-base placeholder:text-white/20 outline-none text-sm md:text-lg font-light tracking-wide"
            />
          </div>

          <button
            type="submit"
            className="h-full px-4 md:px-8 bg-accent hover:brightness-110 active:scale-[0.98] text-text-base font-bold rounded-full transition-all shadow-[0_0_40px_-5px_rgba(147,3,46,0.4)] whitespace-nowrap text-lg cursor-pointer flex items-center justify-center min-w-[48px] md:min-w-0"
          >
            <span className="hidden md:block">Get Link!</span>
            <ArrowRight
              size={18}
              className="md:hidden block"
              strokeWidth={2.5}
            />
          </button>
        </form>
      </div>

      <p className="mt-6 md:mt-8 text-center text-text-muted/40 text-[9px] md:text-[10px] font-medium tracking-[0.3em] md:tracking-[0.4em] uppercase">
        {tagline}
      </p>
    </div>
  );
}
