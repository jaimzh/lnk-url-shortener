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
        className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-text-muted hover:text-text-base flex items-center justify-center"
        title="View QR Code"
      >
        <QrCode size={20} />
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
