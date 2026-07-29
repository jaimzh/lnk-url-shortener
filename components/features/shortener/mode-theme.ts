import type { CSSProperties } from "react";
import { SHORTENER_MODES } from "./advanced-options/constants";
import type { ShortenerMode } from "./advanced-options/constants";

const LINK_ACCENT = "var(--custom-accent)";
const CDN_ACCENT = "var(--custom-cdn-accent)";

function transparentAccent(accent: string, amount: number) {
  return `color-mix(in srgb, ${accent} ${amount}%, transparent)`;
}

function lightAccent(accent: string, amount: number) {
  return `color-mix(in srgb, ${accent} ${amount}%, white)`;
}

export const SHORTENER_MODE_THEME = {
  [SHORTENER_MODES.LINK]: {
    accent: LINK_ACCENT,
    accentSoft: transparentAccent(LINK_ACCENT, 18),
    accentFaint: transparentAccent(LINK_ACCENT, 8),
    accentBorder: transparentAccent(LINK_ACCENT, 50),
    accentBorderSoft: transparentAccent(LINK_ACCENT, 25),
    accentFocus: LINK_ACCENT,
    accentText: "var(--custom-text-base)",
    modeText: LINK_ACCENT,
    badgeText: "var(--custom-text-muted)",
    buttonBg: LINK_ACCENT,
    buttonText: "var(--custom-text-base)",
  },
  [SHORTENER_MODES.CDN]: {
    accent: CDN_ACCENT,
    accentSoft: transparentAccent(CDN_ACCENT, 18),
    accentFaint: transparentAccent(CDN_ACCENT, 8),
    accentBorder: transparentAccent(CDN_ACCENT, 50),
    accentBorderSoft: transparentAccent(CDN_ACCENT, 25),
    accentFocus: CDN_ACCENT,
    accentText: lightAccent(CDN_ACCENT, 70),
    modeText: CDN_ACCENT,
    badgeText: lightAccent(CDN_ACCENT, 70),
    buttonBg: CDN_ACCENT,
    buttonText: "var(--custom-text-base)",
  },
} as const;

export function getShortenerModeTheme(mode: ShortenerMode) {
  return SHORTENER_MODE_THEME[mode];
}

export function getShortenerModeStyle(mode: ShortenerMode) {
  const theme = getShortenerModeTheme(mode);

  return {
    "--shortener-accent": theme.accent,
    "--shortener-accent-soft": theme.accentSoft,
    "--shortener-accent-faint": theme.accentFaint,
    "--shortener-accent-border": theme.accentBorder,
    "--shortener-accent-border-soft": theme.accentBorderSoft,
    "--shortener-accent-focus": theme.accentFocus,
    "--shortener-accent-text": theme.accentText,
    "--shortener-mode-text": theme.modeText,
    "--shortener-badge-text": theme.badgeText,
    "--shortener-button-bg": theme.buttonBg,
    "--shortener-button-text": theme.buttonText,
  } as CSSProperties;
}