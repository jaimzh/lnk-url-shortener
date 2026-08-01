import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const CANONICAL_DISPLAY_DOMAIN = "lnnk.click";
const LEGACY_DISPLAY_DOMAIN = "lnk.pxxl.click";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function readFromClipboard(): Promise<string | null> {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    console.error("Failed to read clipboard:", error);
    return null;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

function normalizeDisplayDomain(domain: string) {
  const normalizedDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (normalizedDomain === LEGACY_DISPLAY_DOMAIN) {
    return CANONICAL_DISPLAY_DOMAIN;
  }

  return normalizedDomain;
}

export function getDisplayDomain() {
  if (typeof window !== "undefined") {
    return normalizeDisplayDomain(window.location.host);
  }

  return normalizeDisplayDomain(
    process.env.NEXT_PUBLIC_BASE_URL || CANONICAL_DISPLAY_DOMAIN,
  );
}
