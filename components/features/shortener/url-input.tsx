"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Clipboard, FileImage, ImagePlus, X } from "lucide-react";
import { useHeroContext } from "@/context/HeroContext";
import LoadingModal from "@/components/features/shortener/loading-modal";
import { readFromClipboard, cn } from "@/lib/utils";
import { ShortenButton } from "@/components/ui/shorten-button";
import { urlSchema } from "@/schemas/url";
import { AdvancedOptions } from "@/components/features/shortener/advanced-options";
import { ModeSwitcher } from "@/components/features/shortener/mode-switcher";
import {
  ALIAS_STRATEGIES,
  SHORTENER_MODES,
  AliasStrategy,
  RandomFlavor,
} from "@/components/features/shortener/advanced-options/constants";
import { generateRandomAlias } from "@/components/features/shortener/advanced-options/utils";
import { useShortenerTheme } from "@/components/features/shortener/shortener-theme-provider";

import { useRouter } from "next/navigation";

type AssetPreview = {
  name: string;
  size: number;
  previewUrl: string | null;
};

type InputAreaProps = {
  url: string;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFocus: () => void;
  onPaste: () => void;
  onUrlChange: (value: string) => void;
};

type CdnAssetInputProps = InputAreaProps & {
  assetPreview: AssetPreview | null;
  onAssetSelect: (file: File) => void;
  onAssetClear: () => void;
};

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function LinkUrlInput({
  url,
  error,
  inputRef,
  onFocus,
  onPaste,
  onUrlChange,
}: InputAreaProps) {
  return (
    <div className="flex items-center flex-1 pl-2 md:pl-3 pr-2 md:pr-4 gap-3 md:gap-4 min-w-0">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPaste}
        className="shrink-0 text-text-muted hover:text-[color:var(--shortener-accent)] transition-colors p-1 cursor-pointer"
        title="Paste from clipboard"
      >
        <Clipboard size={18} strokeWidth={1.5} className="md:w-5 md:h-5" />
      </motion.button>

      <input
        ref={inputRef}
        type="text"
        value={url}
        onFocus={onFocus}
        onChange={(event) => onUrlChange(event.target.value)}
        placeholder="Drop long link here..."
        className={cn(
          "w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-sm md:text-base font-light tracking-wide py-1",
          "caret-[color:var(--shortener-accent)]",
        )}
        aria-invalid={Boolean(error)}
      />
    </div>
  );
}

function CdnAssetInput({
  url,
  error,
  inputRef,
  assetPreview,
  onAssetSelect,
  onAssetClear,
  onFocus,
  onPaste,
  onUrlChange,
}: CdnAssetInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onAssetSelect(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
      return;
    }

    const droppedText =
      event.dataTransfer.getData("text/uri-list") ||
      event.dataTransfer.getData("text/plain");

    if (droppedText) {
      onUrlChange(droppedText.trim());
      inputRef.current?.focus();
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && event.currentTarget.contains(relatedTarget)) {
      return;
    }

    setIsDragging(false);
  };

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex items-center flex-1 pl-2 md:pl-3 pr-2 md:pr-4 gap-3 md:gap-4 min-w-0 rounded-full transition-colors",
        isDragging &&
          "bg-[color:var(--shortener-accent-faint)] ring-1 ring-inset ring-[color:var(--shortener-accent-border)]",
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {assetPreview?.previewUrl ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[color:var(--shortener-accent-border-soft)] bg-bg-base/70"
          title="Choose asset"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPreview.previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </button>
      ) : (
        <motion.button
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => fileInputRef.current?.click()}
          className="shrink-0 text-text-muted hover:text-[color:var(--shortener-accent)] transition-colors p-1 cursor-pointer"
          title="Choose asset"
        >
          <ImagePlus size={18} strokeWidth={1.5} className="md:w-5 md:h-5" />
        </motion.button>
      )}

      <div className="grid flex-1 min-w-0 gap-0.5 text-left">
        {assetPreview ? (
          <div className="flex items-center  min-w-0 gap-2 text-sm text-text-base">
            <FileImage
              size={14}
              strokeWidth={1.7}
              className="shrink-0 text-[color:var(--shortener-accent)]"
            />
            <span className="truncate font-medium">{assetPreview.name}</span>
            <span className="shrink-0 text-xs text-text-muted/50 mt-1">
              {formatFileSize(assetPreview.size)}
            </span>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={url}
            onFocus={onFocus}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="Drop asset URL or image here..."
            className={cn(
              "w-full bg-transparent text-text-base placeholder:text-text-muted/20 outline-none text-sm md:text-base font-light tracking-wide py-1",
              "caret-[color:var(--shortener-accent)]",
            )}
            aria-invalid={Boolean(error)}
          />
        )}
      </div>

      {assetPreview ? (
        <button
          type="button"
          onClick={onAssetClear}
          className="shrink-0 rounded-full p-1 text-text-muted/60 transition-colors hover:text-text-base"
          title="Remove asset"
        >
          <X size={16} strokeWidth={1.7} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onPaste}
          className="shrink-0 rounded-full p-1 text-text-muted/50 transition-colors hover:text-[color:var(--shortener-accent)]"
          title="Paste asset URL"
        >
          <Clipboard size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

export default function UrlInput() {
  const router = useRouter();
  const { setIsHeroShortened } = useHeroContext();
  const { mode: shortenerMode, setMode: setShortenerMode } =
    useShortenerTheme();

  const [url, setUrl] = useState("");
  const [assetPreview, setAssetPreview] = useState<AssetPreview | null>(null);
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
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  // Branding part
  const [brandingTitle, setBrandingTitle] = useState("");
  const [brandingDescription, setBrandingDescription] = useState("");
  const [brandingImageUrl, setBrandingImageUrl] = useState("");

  const handleRegenerateRandom = useCallback(() => {
    setRandomPreview(generateRandomAlias(randomFlavor));
  }, [randomFlavor]);

  React.useEffect(() => {
    if (aliasType === ALIAS_STRATEGIES.RANDOM) {
      handleRegenerateRandom();
    }
  }, [aliasType, handleRegenerateRandom]);
  const getAliasToSend = () => {
    if (aliasType === ALIAS_STRATEGIES.CUSTOM && customAlias.trim() !== "") {
      return customAlias.trim();
    }

    return randomPreview || generateRandomAlias(randomFlavor);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    return () => {
      if (assetPreview?.previewUrl) {
        URL.revokeObjectURL(assetPreview.previewUrl);
      }
    };
  }, [assetPreview]);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (assetPreview) setAssetPreview(null);
    if (error) setError(null);
  };

  const handleAssetSelect = (file: File) => {
    if (assetPreview?.previewUrl) {
      URL.revokeObjectURL(assetPreview.previewUrl);
    }

    setUrl("");
    setError(null);
    setAssetPreview({
      name: file.name,
      size: file.size,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    });
  };

  const handleAssetClear = () => {
    if (assetPreview?.previewUrl) {
      URL.revokeObjectURL(assetPreview.previewUrl);
    }

    setAssetPreview(null);
    inputRef.current?.focus();
  };

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    const alias = getAliasToSend();

    const validation = urlSchema.safeParse({
      url: trimmed,
      alias: alias,
      visibility: visibility,
      brandingTitle: brandingTitle,
      brandingDescription: brandingDescription,
      brandingImage: brandingImageUrl,
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
          visibility: validation.data.visibility,
          brandingTitle: validation.data.brandingTitle,
          brandingDescription: validation.data.brandingDescription,
          brandingImage: validation.data.brandingImage,
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
      setVisibility("public");
      setBrandingTitle("");
      setBrandingDescription("");
      setBrandingImageUrl("");

      setRandomPreview(generateRandomAlias("text"));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Failed to shorten URL:", error);
      setError(message);
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
      handleUrlChange(copiedText);
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
              : "border-[color:var(--shortener-accent-border)] focus-within:border-[color:var(--shortener-accent-focus)]",
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-1 opacity-80",
              error
                ? "bg-linear-to-r from-transparent via-destructive/50 to-transparent"
                : "bg-[linear-gradient(to_right,transparent,var(--shortener-accent-border),transparent)]",
            )}
          />

          <form
            onSubmit={handleShorten}
            className="flex items-center w-full h-full"
          >
            {shortenerMode === SHORTENER_MODES.CDN ? (
              <CdnAssetInput
                url={url}
                error={error}
                inputRef={inputRef}
                assetPreview={assetPreview}
                onFocus={() => setIsHeroShortened(true)}
                onPaste={handlePaste}
                onUrlChange={handleUrlChange}
                onAssetSelect={handleAssetSelect}
                onAssetClear={handleAssetClear}
              />
            ) : (
              <LinkUrlInput
                url={url}
                error={error}
                inputRef={inputRef}
                onFocus={() => setIsHeroShortened(true)}
                onPaste={handlePaste}
                onUrlChange={handleUrlChange}
              />
            )}

            <ShortenButton
              type="submit"
              disabled={!url.trim() || isLoading}
              isLoading={isLoading}
              className="h-full px-2 md:px-4 min-w-[40px] md:min-w-[140px]"
            >
              {shortenerMode === SHORTENER_MODES.CDN ? "Create CDN" : "Shorten"}
            </ShortenButton>
          </form>
        </div>

        <ModeSwitcher mode={shortenerMode} onModeChange={setShortenerMode} />

        <AdvancedOptions
          mode={shortenerMode}
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
          visibility={visibility}
          setVisibility={setVisibility}
          brandingTitle={brandingTitle}
          setBrandingTitle={setBrandingTitle}
          brandingDescription={brandingDescription}
          setBrandingDescription={setBrandingDescription}
          brandingImageUrl={brandingImageUrl}
          setBrandingImageUrl={setBrandingImageUrl}
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
