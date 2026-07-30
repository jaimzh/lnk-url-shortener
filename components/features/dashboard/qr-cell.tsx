"use client";

import { QrCode } from "lucide-react";
import { useMemo, useState } from "react";
import UrlCard from "../../shared/url-card";
import Modal from "../../shared/modal";
import { getShortenerModeStyle } from "@/components/features/shortener/mode-theme";
import { SHORTENER_MODES } from "@/components/features/shortener/advanced-options/constants";
import type { ShortenerMode } from "@/components/features/shortener/advanced-options/constants";

interface QrCellProps {
  mode?: ShortenerMode;
  originalUrl: string;
  shortUrl: string;
}

export function QrCell({
  mode = SHORTENER_MODES.LINK,
  originalUrl,
  shortUrl,
}: QrCellProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modeStyle = useMemo(() => getShortenerModeStyle(mode), [mode]);

  return (
    <div className="flex items-center justify-center w-full px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-[color:var(--shortener-accent-soft)] rounded-lg transition-all duration-300 text-text-muted/50 hover:text-[color:var(--shortener-accent)] flex items-center justify-center group-hover:scale-110"
        title="View QR Code"
      >
        <QrCode size={18} strokeWidth={1.5} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} style={modeStyle}>
        <UrlCard
          mode={mode}
          result={{ originalUrl, shortUrl }}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}