"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import LoadingSpinner from "../../shared/LoadingSpinner";
import UrlCard from "../../shared/url-card";
import Modal from "../../shared/Modal";

interface LoadingModalProps {
  isLoading: boolean;
  result: {
    originalUrl: string;
    shortUrl: string;
  } | null;
  onClose: () => void;
}

export default function LoadingModal({
  isLoading,
  result,
  onClose,
}: LoadingModalProps) {
  const showModal = isLoading || !!result;

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSpinner key="loading" />
        ) : result ? (
          <UrlCard key="success" result={result} onClose={onClose} />
        ) : null}
      </AnimatePresence>
    </Modal>
  );
}
