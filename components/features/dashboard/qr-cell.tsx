"use client";

import { QrCode } from "lucide-react";
import { useState } from "react";
import UrlCard from "../../shared/url-card";
import Modal from "../../shared/Modal";

interface QrCellProps {
  originalUrl: string;
  shortUrl: string;
}

export function QrCell({ originalUrl, shortUrl }: QrCellProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center w-full px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-accent/10 rounded-lg transition-all duration-300 text-text-muted/50 hover:text-accent flex items-center justify-center group-hover:scale-110"
        title="View QR Code"
      >
        <QrCode size={18} strokeWidth={1.5} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UrlCard
          result={{ originalUrl, shortUrl }}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
}
