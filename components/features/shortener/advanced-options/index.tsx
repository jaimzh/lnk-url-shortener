"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Globe,
  Lock,
  Settings2,
  Share2,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALIAS_STRATEGIES,
  AliasStrategy,
  RandomFlavor,
  SHORTENER_MODES,
  ShortenerMode,
} from "./constants";

import { StrategySelector } from "./strategy-selector";
import { RandomStrategy } from "./random-strategy";
import { CustomStrategy } from "./custom-strategy";
import { BrandingOptions } from "./branding-options";

interface AdvancedOptionsProps {
  mode: ShortenerMode;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  aliasType: AliasStrategy;
  setAliasType: (type: AliasStrategy) => void;
  customAlias: string;
  setCustomAlias: (alias: string) => void;
  randomFlavor: RandomFlavor;
  setRandomFlavor: (flavor: RandomFlavor) => void;
  randomPreview: string;
  onRegenerate: () => void;
  visibility: "public" | "private";
  setVisibility: (visibility: "public" | "private") => void;
  brandingTitle: string;
  setBrandingTitle: (val: string) => void;
  brandingDescription: string;
  setBrandingDescription: (val: string) => void;
  brandingImageUrl: string;
  setBrandingImageUrl: (val: string) => void;
  cdnExpiresInSeconds: number | null;
  setCdnExpiresInSeconds: (seconds: number | null) => void;
  cdnCacheTtlSeconds: number;
  setCdnCacheTtlSeconds: (seconds: number) => void;
}

const cdnCacheTtls = [
  { label: "1 Hour", seconds: 60 * 60 },
  { label: "24 Hours", seconds: 24 * 60 * 60 },
  { label: "7 Days", seconds: 7 * 24 * 60 * 60 },
] as const;

const cdnExpiryOptions = [
  { label: "Never", seconds: null },
  { label: "1 Hour", seconds: 60 * 60 },
  { label: "24 Hours", seconds: 24 * 60 * 60 },
  { label: "7 Days", seconds: 7 * 24 * 60 * 60 },
] as const;
interface CdnPillProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function CdnPill({ active, children, onClick }: CdnPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shortener-accent-border)]",
        active
          ? "bg-[color:var(--shortener-accent-soft)] text-[color:var(--shortener-accent-text)] shadow-sm shadow-[color:var(--shortener-accent-faint)] ring-1 ring-[color:var(--shortener-accent-border-soft)]"
          : "bg-bg-base/45 text-text-muted/45 hover:bg-white/5 hover:text-text-muted",
      )}
    >
      {children}
    </button>
  );
}

interface CdnOptionsPanelProps {
  aliasType: AliasStrategy;
  setAliasType: (type: AliasStrategy) => void;
  customAlias: string;
  setCustomAlias: (alias: string) => void;
  randomFlavor: RandomFlavor;
  setRandomFlavor: (flavor: RandomFlavor) => void;
  randomPreview: string;
  onRegenerate: () => void;
  expiresInSeconds: number | null;
  setExpiresInSeconds: (seconds: number | null) => void;
  cacheTtlSeconds: number;
  setCacheTtlSeconds: (seconds: number) => void;
  visibility: "public" | "private";
  setVisibility: (visibility: "public" | "private") => void;
}

function CdnOptionsPanel({
  aliasType,
  setAliasType,
  customAlias,
  setCustomAlias,
  randomFlavor,
  setRandomFlavor,
  randomPreview,
  onRegenerate,
  expiresInSeconds,
  setExpiresInSeconds,
  cacheTtlSeconds,
  setCacheTtlSeconds,
  visibility,
  setVisibility,
}: CdnOptionsPanelProps) {
  return (
    <motion.div
      key="cdn-options"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="space-y-5"
    >
      <div className="space-y-4">
        <StrategySelector
          aliasType={aliasType}
          onStrategyChange={(type) => {
            setAliasType(type);
            setCustomAlias("");
          }}
        />

        <div className="min-h-[100px]">
          <AnimatePresence mode="wait">
            {aliasType === ALIAS_STRATEGIES.RANDOM ? (
              <RandomStrategy
                randomFlavor={randomFlavor}
                setRandomFlavor={setRandomFlavor}
                randomPreview={randomPreview}
                onRegenerate={onRegenerate}
                displayPrefix="cdn.lnnk.click/"
              />
            ) : (
              <CustomStrategy
                customAlias={customAlias}
                setCustomAlias={setCustomAlias}
                displayPrefix="cdn.lnnk.click/"
                placeholder="custom-text"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted/45">
          <Timer size={13} />
          Expires After
        </div>
        <div className="flex flex-wrap gap-2">
          {cdnExpiryOptions.map((option) => (
            <CdnPill
              key={option.label}
              active={expiresInSeconds === option.seconds}
              onClick={() => setExpiresInSeconds(option.seconds)}
            >
              {option.label}
            </CdnPill>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted/45">
          <Timer size={13} />
          Cache TTL
        </div>
        <div className="flex flex-wrap gap-2">
          {cdnCacheTtls.map((option) => (
            <CdnPill
              key={option.label}
              active={cacheTtlSeconds === option.seconds}
              onClick={() => setCacheTtlSeconds(option.seconds)}
            >
              {option.label}
            </CdnPill>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent my-2" />

      <div className="flex items-center justify-center gap-4 md:gap-12 pt-1">
        {[
          { id: "public", icon: Globe, label: "Public" },
          { id: "private", icon: Lock, label: "Private" },
        ].map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setVisibility(option.id as "public" | "private")}
            className="group flex items-center gap-3 cursor-pointer outline-none w-24 md:w-auto"
          >
            <div
              className={cn(
                "relative w-3.5 h-3.5 rounded-full border transition-all duration-500 flex items-center justify-center shrink-0",
                visibility === option.id
                  ? "border-[color:var(--shortener-accent-border)] bg-[color:var(--shortener-accent-soft)]"
                  : "border-white/10 bg-transparent group-hover:border-white/20",
              )}
            >
              {visibility === option.id && (
                <motion.div
                  layoutId="cdn-radio-inner"
                  className="w-1.5 h-1.5 rounded-full bg-[color:var(--shortener-accent)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <option.icon
                size={14}
                className={cn(
                  "transition-colors duration-300",
                  visibility === option.id
                    ? "text-[color:var(--shortener-accent)]"
                    : "text-text-muted/40 group-hover:text-text-muted",
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                  visibility === option.id
                    ? "text-text-base"
                    : "text-text-muted/40 group-hover:text-text-muted",
                )}
              >
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent my-2" />

      <div className="rounded-xl border border-white/5 bg-bg-base/25 px-3 py-2 text-left text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted/35">
        Expires After controls link lifetime. Cache TTL controls browser and CDN edge caching.
      </div>
    </motion.div>
  );
}

export function AdvancedOptions({
  mode,
  showAdvanced,
  setShowAdvanced,
  aliasType,
  setAliasType,
  customAlias,
  setCustomAlias,
  randomFlavor,
  setRandomFlavor,
  randomPreview,
  onRegenerate,
  visibility,
  setVisibility,
  brandingTitle,
  setBrandingTitle,
  brandingDescription,
  setBrandingDescription,
  brandingImageUrl,
  setBrandingImageUrl,
  cdnExpiresInSeconds,
  setCdnExpiresInSeconds,
  cdnCacheTtlSeconds,
  setCdnCacheTtlSeconds,
}: AdvancedOptionsProps) {
  const [showBranding, setShowBranding] = React.useState(false);
  const isCdnMode = mode === SHORTENER_MODES.CDN;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "group flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all cursor-pointer",
            showAdvanced
              ? "text-text-base bg-white/5"
              : "text-text-muted hover:text-text-base hover:bg-white/5",
          )}
        >
          <Settings2
            size={14}
            className={cn(
              "transition-transform duration-700",
              showAdvanced
                ? cn("rotate-180", "text-[color:var(--shortener-mode-text)]")
                : "group-hover:rotate-45",
            )}
          />
          <span>Advanced Options</span>

          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-300 opacity-50",
              showAdvanced && "rotate-180 opacity-100",
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4">
              <div
                className={cn(
                  "bg-bg-base/30 rounded-3xl p-6 border backdrop-blur-sm transition-colors duration-300",
                  "border-[color:var(--shortener-accent-border)]",
                )}
              >
                <div className="max-w-md mx-auto space-y-6">
                  <AnimatePresence mode="wait">
                    {isCdnMode ? (
                      <CdnOptionsPanel
                        aliasType={aliasType}
                        setAliasType={setAliasType}
                        customAlias={customAlias}
                        setCustomAlias={setCustomAlias}
                        randomFlavor={randomFlavor}
                        setRandomFlavor={setRandomFlavor}
                        randomPreview={randomPreview}
                        onRegenerate={onRegenerate}
                        expiresInSeconds={cdnExpiresInSeconds}
                        setExpiresInSeconds={setCdnExpiresInSeconds}
                        cacheTtlSeconds={cdnCacheTtlSeconds}
                        setCacheTtlSeconds={setCdnCacheTtlSeconds}
                        visibility={visibility}
                        setVisibility={setVisibility}
                      />
                    ) : (
                      <motion.div
                        key="link-options"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-6"
                      >
                        <StrategySelector
                          aliasType={aliasType}
                          onStrategyChange={(type) => {
                            setAliasType(type);
                            setCustomAlias("");
                          }}
                        />

                        <div className="min-h-[100px]">
                          <AnimatePresence mode="wait">
                            {aliasType === ALIAS_STRATEGIES.RANDOM ? (
                              <RandomStrategy
                                randomFlavor={randomFlavor}
                                setRandomFlavor={setRandomFlavor}
                                randomPreview={randomPreview}
                                onRegenerate={onRegenerate}
                              />
                            ) : (
                              <CustomStrategy
                                customAlias={customAlias}
                                setCustomAlias={setCustomAlias}
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent my-2" />

                        <div className="flex md:flex-row items-center justify-center gap-4 md:gap-12 pt-4">
                          {[
                            { id: "public", icon: Globe, label: "Public" },
                            { id: "private", icon: Lock, label: "Private" },
                          ].map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() =>
                                setVisibility(option.id as "public" | "private")
                              }
                              className="group flex items-center gap-3 cursor-pointer outline-none w-24 md:w-auto"
                            >
                              <div
                                className={cn(
                                  "relative w-3.5 h-3.5 rounded-full border transition-all duration-500 flex items-center justify-center shrink-0",
                                  visibility === option.id
                                    ? "border-[color:var(--shortener-accent-border)] bg-[color:var(--shortener-accent-soft)]"
                                    : "border-white/10 bg-transparent group-hover:border-white/20",
                                )}
                              >
                                {visibility === option.id && (
                                  <motion.div
                                    layoutId="radio-inner"
                                    className="w-1.5 h-1.5 rounded-full bg-[color:var(--shortener-accent)]"
                                    transition={{
                                      type: "spring",
                                      bounce: 0.2,
                                      duration: 0.6,
                                    }}
                                  />
                                )}
                              </div>

                              <div className="flex items-center gap-2.5">
                                <option.icon
                                  size={14}
                                  className={cn(
                                    "transition-colors duration-300",
                                    visibility === option.id
                                      ? "text-[color:var(--shortener-accent)]"
                                      : "text-text-muted/40 group-hover:text-text-muted",
                                  )}
                                />
                                <span
                                  className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                                    visibility === option.id
                                      ? "text-text-base"
                                      : "text-text-muted/40 group-hover:text-text-muted",
                                  )}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent my-2" />

                        <div className="space-y-4 pt-2">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => setShowBranding(!showBranding)}
                              className={cn(
                                "group flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all cursor-pointer",
                                showBranding
                                  ? "text-text-base bg-white/5"
                                  : "text-text-muted hover:text-text-base hover:bg-white/5",
                              )}
                            >
                              <Share2
                                size={14}
                                className={cn(
                                  "transition-all duration-700",
                                  showBranding
                                    ? "rotate-[360deg]"
                                    : "group-hover:rotate-45",
                                )}
                              />
                              <span>Link Branding</span>
                              <ChevronDown
                                size={14}
                                className={cn(
                                  "transition-transform duration-300 opacity-50",
                                  showBranding && "rotate-180 opacity-100",
                                )}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {showBranding && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 pb-2">
                                  <BrandingOptions
                                    title={brandingTitle}
                                    setTitle={setBrandingTitle}
                                    description={brandingDescription}
                                    setDescription={setBrandingDescription}
                                    imageUrl={brandingImageUrl}
                                    setImageUrl={setBrandingImageUrl}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
