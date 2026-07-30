"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, CheckCheck, X, ExternalLink } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/ui/button";

interface UrlCardProps {
  mode?: "link" | "cdn";
  result: {
    originalUrl: string;
    shortUrl: string;
  };
  onClose: () => void;
}

export default function UrlCard({ mode = "link", result, onClose }: UrlCardProps) {
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
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        opacity: { duration: 0.15 },
      }}
      className="relative bg-bg-base border border-[color:var(--shortener-accent-border-soft,var(--border))] rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-[color:var(--shortener-accent-soft,var(--accent))] hover:text-text-base"
      >
        <X size={18} />
      </button>

      <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
        <div className=" flex gap-2 items-center justify-center mb-2">

          <CheckCheck
            size={32}
            strokeWidth={3}
            className="text-[color:var(--shortener-accent,var(--accent))]"
          />
          <h3 className="text-xl md:text-2xl font-semibold text-text-base">
            {mode === "cdn" ? "lnnk" : "lnnk"}
          </h3>
        </div>

        <div className="h-px w-full max-w-4xl bg-linear-to-r from-transparent via-transparent to-transparent [--tw-gradient-via:var(--shortener-accent-border-soft,var(--border))]"></div>

        <div className="space-y-1 w-full overflow-hidden">
          <p className="text-text-muted text-sm truncate max-w-full px-4 opacity-70">
            {result.originalUrl}
          </p>
        </div>

        {/* QR Code */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="p-3 bg-white rounded-xl shadow-lg"
        >
          <QRCodeCanvas
            value={result.shortUrl}
            size={160}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            marginSize={0}
          />
        </motion.div>

        {/* Result Box */}
        <div
          className="w-full bg-white/5 border border-[color:var(--shortener-accent-border-soft,var(--border))] rounded-xl p-4 flex items-center justify-between gap-3 group hover:border-[color:var(--shortener-accent-border,var(--border))] transition-colors cursor-pointer"
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
            className={`flex-1 py-3 px-4 font-medium transition-all bg-[color:var(--shortener-button-bg,var(--accent))] text-[color:var(--shortener-button-text,var(--text-base))] hover:brightness-110 ${
              copied
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:brightness-100 shadow-none border border-green-500/20"
                : ""
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied" : "Copy Link"}
          </Button>

          <a
            href={result.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white/5 p-3 text-text-base transition-colors hover:bg-[color:var(--shortener-accent-soft,var(--accent))]"
            title="Open Link"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
