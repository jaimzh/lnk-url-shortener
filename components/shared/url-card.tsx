"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, X, ExternalLink } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/ui/button";

interface UrlCardProps {
  result: {
    originalUrl: string;
    shortUrl: string;
  };
  onClose: () => void;
}

export default function UrlCard({ result, onClose }: UrlCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative bg-bg-base border border-border rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full"
    >
      {/* Glowing header line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-3 right-3 text-text-muted hover:text-text-base hover:bg-white/5 rounded-full z-10 w-8 h-8"
      >
        <X size={18} />
      </Button>

      <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
        {/* Icon */}
        <div className=" flex gap-2 items-center justify-center mb-2">
          <Check size={32} strokeWidth={3} />
          <h3 className="text-xl md:text-2xl font-semibold text-text-base">
            Lnk
          </h3>
        </div>

        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <div className="space-y-1 w-full overflow-hidden">
          <p className="text-text-muted text-sm truncate max-w-full px-4 opacity-70">
            {result.originalUrl}
          </p>
        </div>

        {/* QR Code */}
        <div className="p-3 bg-white rounded-xl shadow-lg">
          <QRCodeCanvas
            value={result.shortUrl}
            size={160}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            marginSize={0}
          />
        </div>

        {/* Result Box */}
        <div
          className="w-full bg-white/5 border border-border/40 rounded-xl p-4 flex items-center justify-between gap-3 group hover:border-border transition-colors cursor-pointer"
          onClick={handleCopy}
        >
          <span className="text-text-base text-lg font-medium truncate">
            {result.shortUrl}
          </span>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3">
          <Button
            onClick={handleCopy}
            variant="pill"
            className={`flex-1 py-3 px-4 font-medium transition-all ${
              copied
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:brightness-100 shadow-none border border-green-500/20"
                : ""
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied" : "Copy Link"}
          </Button>

          <Button
            asChild
            variant="ghost"
            className="bg-white/5 hover:bg-white/10 text-text-base p-3 rounded-full h-auto"
            title="Open Link"
          >
            <a href={result.shortUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={20} />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
