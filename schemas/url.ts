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
    .max(50, "Alias must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

export type UrlInput = z.infer<typeof urlSchema>;
