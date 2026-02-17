import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .regex(
      /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/.*)?$/i,
      "Please enter a valid link (e.g., google.com or https://example.com)",
    )
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
    .max(50, "Alias must be under 50 characters")
    .regex(
      /^[\w\-.\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u,
      "Only letters, numbers, dashes, and emojis allowed",
    )
    .transform((val) => val.replace(/\s+/g, "-"))
    .optional()
    .or(z.literal("")),
  visibility: z.enum(["public", "private"]).default("public"),

  brandingTitle: z
    .string()
    .max(100, "Title must be under 100 characters")
    .optional(),
  brandingDescription: z
    .string()
    .max(250, "Description must be under 250 characters")
    .optional(),
  brandingImage: z
    .string()
    .url("Please enter a valid image URL")
    .regex(
      /(?:[./])(jpg|jpeg|png|webp|gif|avif)(?:\?.*)?$/i,
      "URL must be a direct link to an image (jpg, png, webp, etc.)",
    )
    .optional()
    .or(z.literal("")),
});

export type UrlInput = z.infer<typeof urlSchema>;
