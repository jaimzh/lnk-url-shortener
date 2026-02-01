export const EMOJIS = [
  "🔥",
  "🚀",
  "💀",
  "✨",
  "🌈",
  "🍦",
  "⚡",
  "💎",
  "🦄",
  "🍀",
  "🍕",
  "🎮",
];
import { KAOMOJIS } from "@/data/kaomojis";
export { KAOMOJIS };

export const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export const ALIAS_STRATEGIES = {
  RANDOM: "random",
  CUSTOM: "custom",
} as const;

export const RANDOM_FLAVORS = [
  { id: "text", label: "Text" },
  { id: "emoji", label: "Emoji" },
  { id: "kaomoji", label: "Kaomoji" },
  { id: "mix", label: "Mix" },
] as const;

export type AliasStrategy =
  (typeof ALIAS_STRATEGIES)[keyof typeof ALIAS_STRATEGIES];
export type RandomFlavor = (typeof RANDOM_FLAVORS)[number]["id"];
