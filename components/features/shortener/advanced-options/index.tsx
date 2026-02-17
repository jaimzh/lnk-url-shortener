"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Settings2, ChevronDown, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALIAS_STRATEGIES, AliasStrategy, RandomFlavor } from "./constants";

import { StrategySelector } from "./strategy-selector";
import { RandomStrategy } from "./random-strategy";
import { CustomStrategy } from "./custom-strategy";
import { BrandingOptions } from "./branding-options";
import { LayoutGrid, Share2 } from "lucide-react";

interface AdvancedOptionsProps {
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
}

export function AdvancedOptions({
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
}: AdvancedOptionsProps) {
  const [showBranding, setShowBranding] = React.useState(false);

  return (
    <div className="space-y-2 pt-2">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "group flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold  tracking-widest transition-all cursor-pointer",
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
                ? "rotate-180 text-text-base"
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
              <div className="bg-bg-base/30 rounded-3xl p-6 border border-accent/50 backdrop-blur-sm">
                <div className="max-w-md mx-auto space-y-6">
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


                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-4">
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
                              ? "border-accent/60 bg-accent/10"
                              : "border-white/10 bg-transparent group-hover:border-white/20",
                          )}
                        >
                          {visibility === option.id && (
                            <motion.div
                              layoutId="radio-inner"
                              className="w-1.5 h-1.5 rounded-full bg-accent"
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
                                ? "text-accent"
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

                  {/* Divider */}
                  <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent my-2" />

                  {/* Branding Section */}
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
                              ? "rotate-[360deg] "
                              : "group-hover:rotate-45 ",
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
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
