"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Link2, ArrowRight, ClipboardPaste } from "lucide-react";
import { useHeroContext } from "@/context/HeroContext";
import LoadingModal from "@/components/features/shortener/LoadingModal";
import { readFromClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UrlInputProps = {
  onShorten?: (url: string) => void | Promise<void>;
  className?: string;
};

export default function UrlInput() {
  const { isHeroShortened, setIsHeroShortened } = useHeroContext();

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    originalUrl: string;
    shortUrl: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      await new Promise((resolve) => setTimeout(resolve, 600));

      setResult(data);
      setIsLoading(false);
      setUrl("");
    } catch (error) {
      console.error("Failed to shorten URL:", error);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setResult(null);
    setIsLoading(false);
  };

  const handlePaste = async () => {
    const copiedText = await readFromClipboard();
    if (copiedText) {
      setUrl(copiedText);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <LoadingModal
        isLoading={isLoading}
        result={result}
        onClose={handleCloseModal}
      />
      <div className={"relative w-full max-w-2xl mx-auto "}>
        <div className="          group relative flex items-center h-12 md:h-16 w-full rounded-full border border-accent/50 bg-bg-base backdrop-blur-sm transition-all duration-300 ease-in-out focus-within:border-accent  p-1 md:p-1.5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-80" />

          <form
            onSubmit={handleShorten}
            className="flex items-center w-full h-full"
          >
            <div className="flex items-center flex-1 pl-4 md:pl-6 pr-2 md:pr-4 gap-3 md:gap-4 min-w-0">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePaste}
                className="shrink-0 text-text-muted hover:text-accent transition-colors p-1 cursor-pointer"
                title="Paste from clipboard"
              >
                <ClipboardPaste
                  size={18}
                  strokeWidth={1.5}
                  className="md:w-5 md:h-5"
                />
              </motion.button>

              <input
                ref={inputRef}
                type="text"
                value={url}
                required
                onFocus={(e) => setIsHeroShortened(true)}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Drop your long link here..."
                className="w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-sm md:text-base font-light tracking-wide py-1 caret-accent"
              />
            </div>

            <Button
              type="submit"
              disabled={!url.trim() || isLoading}
              variant="pill"
              className="h-full px-2 md:px-4 min-w-[40px] md:min-w-[140px] gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className="hidden md:block text-sm uppercase">
                {isLoading ? "Wait..." : "Shorten"}
              </span>
              {!isLoading && <ArrowRight size={14} strokeWidth={2.5} />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
