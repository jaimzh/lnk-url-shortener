import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .transform((url) => {
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    })
    .pipe(
      z.string().url("Please enter a valid URL (e.g., https://example.com)"),
    ),
  alias: z
    .string()
    .trim()
    .max(50, "Alias must be less than 50 characters") // Increased for long Kaomojis
    .optional()
    .or(z.literal("")),
});

export type UrlInput = z.infer<typeof urlSchema>;
