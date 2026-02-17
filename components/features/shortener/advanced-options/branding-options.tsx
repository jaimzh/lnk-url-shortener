import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Type,
  AlignLeft,
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandingOptionsProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
}

export const BrandingOptions = ({
  title,
  setTitle,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
}: BrandingOptionsProps) => {
  const isImageValid =
    !imageUrl ||
    /(?:[./])(jpg|jpeg|png|webp|gif|avif)(?:\?.*)?$/i.test(imageUrl);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        {/* Title Input */}
        <div className="relative group">
          <div className="flex items-center gap-4 bg-bg-base/40 rounded-2xl border border-white/5 p-3.5 focus-within:border-accent/30 transition-all">
            <Type
              size={18}
              className="text-text-muted/20 group-focus-within:text-accent transition-colors shrink-0"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Social Preview Title"
              className="bg-transparent outline-none w-full text-text-base text-sm placeholder:text-text-muted/20"
            />
            <span
              className={cn(
                "text-[8px] font-mono shrink-0 transition-colors",
                title.length > 60 ? "text-yellow-500/40" : "text-text-muted/10",
              )}
            >
              {title.length}/60
            </span>
          </div>
        </div>

        {/* Description Input */}
        <div className="relative group">
          <div className="flex items-start gap-4 bg-bg-base/40 rounded-2xl border border-white/5 p-3.5 focus-within:border-accent/30 transition-all">
            <AlignLeft
              size={18}
              className="text-text-muted/20 group-focus-within:text-accent transition-colors shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={250}
                placeholder="A brief description that grabs attention..."
                rows={2}
                className="bg-transparent outline-none w-full text-text-base text-sm placeholder:text-text-muted/20 resize-none py-1"
              />
              <div className="flex justify-end pr-1">
                <span
                  className={cn(
                    "text-[8px] font-mono transition-colors",
                    description.length > 155
                      ? "text-yellow-500/40"
                      : "text-text-muted/10",
                  )}
                >
                  {description.length}/155
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image URL Input */}
        <div className="relative group">
          <div
            className={cn(
              "flex items-center gap-4 bg-bg-base/40 rounded-2xl border p-3.5 transition-all",
              !isImageValid
                ? "border-red-500/30 bg-red-500/[0.02]"
                : "border-white/5 focus-within:border-accent/30",
            )}
          >
            <ImageIcon
              size={18}
              className={cn(
                "transition-colors shrink-0",
                !isImageValid
                  ? "text-red-500/60"
                  : "text-text-muted/20 group-focus-within:text-accent",
              )}
            />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="bg-transparent outline-none w-full text-text-base text-xs font-mono placeholder:text-text-muted/20"
            />
            {imageUrl && !isImageValid && (
              <span className="text-[10px] text-red-500/60 font-medium whitespace-nowrap px-2">
                Invalid format
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/40 flex items-center gap-2">
            <Sparkles size={10} className="text-accent" />
            Live Preview
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-bg-base/40 h-[210px]">
          {imageUrl ? (
            <div className="h-2/3 w-full relative overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          ) : (
            <div className="h-2/3 w-full bg-white/[0.02] flex items-center justify-center border-b border-white/5">
              <ImageIcon size={32} className="text-white/5" />
            </div>
          )}

          <div className="p-4 space-y-1">
            <h4
              className={cn(
                "text-sm font-bold truncate",
                title ? "text-text-base" : "text-text-muted/40 italic",
              )}
            >
              {title || "Link preview title goes here..."}
            </h4>
            <p
              className={cn(
                "text-xs line-clamp-2 leading-relaxed opacity-70",
                description ? "text-text-muted" : "text-text-muted/20 italic",
              )}
            >
              {description ||
                "The description of the shared link will appear here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
