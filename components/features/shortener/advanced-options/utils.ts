import { nanoid } from "nanoid";
import { EMOJIS, KAOMOJIS, CHARS, RandomFlavor } from "./constants";

export const generateRandomAlias = (flavor: RandomFlavor): string => {
  switch (flavor) {
    case "emoji":
      return Array.from(
        { length: 3 },
        () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      ).join("");
    case "kaomoji":
      return KAOMOJIS[Math.floor(Math.random() * KAOMOJIS.length)];
    case "mix":
      const rChar1 = CHARS[Math.floor(Math.random() * CHARS.length)];
      const rChar2 = CHARS[Math.floor(Math.random() * CHARS.length)];
      const rEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      return `${rChar1}${rEmoji}${rChar2}`;
    case "text":
    default:
      return nanoid(6);
  }
};
