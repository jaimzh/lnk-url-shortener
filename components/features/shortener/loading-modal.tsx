"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import LoadingSpinner from "../../shared/loading-spinner";
import UrlCard from "../../shared/url-card";
import Modal from "../../shared/modal";
import { getShortenerModeStyle } from "@/components/features/shortener/mode-theme";

interface LoadingModalProps {
  isLoading: boolean;
  mode?: "link" | "cdn";
  result: {
    originalUrl: string;
    shortUrl: string;
  } | null;
  onClose: () => void;
}

export default function LoadingModal({
  isLoading,
  mode = "link",
  result,
  onClose,
}: LoadingModalProps) {
  const showModal = isLoading || !!result;
  const modeStyle = React.useMemo(() => getShortenerModeStyle(mode), [mode]);

  return (
    <Modal isOpen={showModal} onClose={onClose} style={modeStyle}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSpinner
            key="loading"
            label={mode === "cdn" ? "Creating CDN..." : "Shortening Link..."}
          />
        ) : result ? (
          <UrlCard
            key="success"
            result={result}
            onClose={onClose}
            mode={mode}
          />
        ) : null}
      </AnimatePresence>
    </Modal>
  );
}