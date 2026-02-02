"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Clipboard } from "lucide-react";
import { useHeroContext } from "@/context/HeroContext";
import LoadingModal from "@/components/features/shortener/loading-modal";
import { readFromClipboard, cn } from "@/lib/utils";
import { ShortenButton } from "@/components/ui/shorten-button";
import { urlSchema } from "@/schemas/url";
import { AdvancedOptions } from "@/components/features/shortener/advanced-options";
import {
  ALIAS_STRATEGIES,
  AliasStrategy,
  RandomFlavor,
} from "@/components/features/shortener/advanced-options/constants";
import { generateRandomAlias } from "@/components/features/shortener/advanced-options/utils";

import { useRouter } from "next/navigation";

export default function UrlInput() {
  const router = useRouter();
  const { isHeroShortened, setIsHeroShortened } = useHeroContext();

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    originalUrl: string;
    shortUrl: string;
  } | null>(null);


  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aliasType, setAliasType] = useState<AliasStrategy>(
    ALIAS_STRATEGIES.RANDOM,
  );
  const [customAlias, setCustomAlias] = useState("");
  const [randomFlavor, setRandomFlavor] = useState<RandomFlavor>("text");
  const [randomPreview, setRandomPreview] = useState("");

  const handleRegenerateRandom = () => {
    setRandomPreview(generateRandomAlias(randomFlavor));
  };

  React.useEffect(() => {
    if (aliasType === ALIAS_STRATEGIES.RANDOM) {
      handleRegenerateRandom();
    }
  }, [aliasType, randomFlavor]);
  const getAliasToSend = () => {
    if (aliasType === ALIAS_STRATEGIES.CUSTOM && customAlias.trim() !== "") {
      return customAlias.trim();
    }
    
    return randomPreview || generateRandomAlias(randomFlavor);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    const alias = getAliasToSend();

   
    const validation = urlSchema.safeParse({
      url: trimmed,
      alias: alias,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: validation.data.url,
          alias: validation.data.alias,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await response.json();
      console.log("Success:", data);

      await new Promise((resolve) => setTimeout(resolve, 600));

      setResult(data);
      router.refresh(); 
      setIsLoading(false);
      setUrl("");
      setCustomAlias("");
      setRandomFlavor("text");
      setAliasType("random");
    
      setRandomPreview(generateRandomAlias("text"));
    } catch (error: any) {
      console.error("Failed to shorten URL:", error);
      setError(error.message || "An unexpected error occurred");
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
      setError(null);
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
      <div className={"relative w-full max-w-2xl mx-auto space-y-4"}>
        <div
          className={cn(
            "group relative flex items-center h-12 md:h-16 w-full rounded-full border bg-bg-base/80 backdrop-blur-xl transition-all duration-300 ease-in-out p-1 md:p-1.5 shadow-2xl",
            error
              ? "border-destructive/50 focus-within:border-destructive"
              : "border-accent/50 focus-within:border-accent",
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent to-transparent opacity-80",
              error ? "via-destructive/50" : "via-accent/50",
            )}
          />

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
                <Clipboard
                  size={18}
                  strokeWidth={1.5}
                  className="md:w-5 md:h-5"
                />
              </motion.button>

              <input
                ref={inputRef}
                type="text"
                value={url}
                onFocus={() => setIsHeroShortened(true)}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Drop your long link here..."
                className="w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-base md:text-base font-light tracking-wide py-1 caret-accent"
              />
            </div>

            <ShortenButton
              type="submit"
              disabled={!url.trim() || isLoading}
              isLoading={isLoading}
              className="h-full px-2 md:px-4 min-w-[40px] md:min-w-[140px]"
            />
          </form>
        </div>

        <AdvancedOptions
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          aliasType={aliasType}
          setAliasType={setAliasType}
          customAlias={customAlias}
          setCustomAlias={setCustomAlias}
          randomFlavor={randomFlavor}
          setRandomFlavor={setRandomFlavor}
          randomPreview={randomPreview}
          onRegenerate={handleRegenerateRandom}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-xs md:text-sm mt-3 ml-6 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    </>
  );
}
