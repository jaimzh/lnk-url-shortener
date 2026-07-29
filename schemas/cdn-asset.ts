import { z } from "zod";

export const cdnAliasSchema = z
  .string()
  .trim()
  .min(1, "Alias is required")
  .max(50, "Alias must be under 50 characters")
  .regex(/^[\w\-.]+$/u, "Use only letters, numbers, dashes, underscores, or dots")
  .transform((value) => value.replace(/\s+/g, "-"));

const cdnAssetOptionsSchema = z.object({
  alias: cdnAliasSchema.optional(),
  expiresInSeconds: z.number().int().positive().nullable().default(null),
  cacheTtlSeconds: z.number().int().min(0).default(24 * 60 * 60),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const createCdnTextAssetSchema = cdnAssetOptionsSchema.extend({
  content: z.string().min(1, "Text content is required"),
});

export const createCdnFileAssetSchema = cdnAssetOptionsSchema.extend({
  filename: z.string().trim().min(1, "Filename is required"),
  contentType: z.string().trim().min(1, "Content type is required"),
  size: z.number().int().min(1, "File cannot be empty"),
});

export const createCdnAssetResponseSchema = z.object({
  alias: z.string(),
  publicUrl: z.string().url(),
  expiresAt: z.string().datetime().nullable(),
  cacheControl: z.string(),
});

export type CreateCdnTextAssetInput = z.infer<typeof createCdnTextAssetSchema>;
export type CreateCdnFileAssetInput = z.infer<typeof createCdnFileAssetSchema>;
export type CreateCdnAssetResponse = z.infer<
  typeof createCdnAssetResponseSchema
>;