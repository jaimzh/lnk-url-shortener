"use client";

import { QrCode } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import UrlCard from "./shared/url-card";

interface QrCellProps {
  originalUrl: string;
  shortUrl: string;
}

export function QrCellx({ originalUrl, shortUrl }: QrCellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center w-full px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-text-muted hover:text-text-base flex items-center justify-center"
        title="View QR Code"
      >
        <QrCode size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Modal Content */}
            <div className="z-10 w-full flex justify-center pointer-events-none">
              <div className="pointer-events-auto">
                <UrlCard
                  result={{ originalUrl, shortUrl }}
                  onClose={() => setIsOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
