import { z } from "zod";

export const cdnAliasSchema = z
  .string()
  .trim()
  .min(1, "Alias is required")
  .max(50, "Alias must be under 50 characters")
  .regex(/^[\w\-.]+$/u, "Use only letters, numbers, dashes, underscores, or dots")
  .transform((value) => value.replace(/\s+/g, "-"));

export const createCdnAssetOptionsSchema = z.object({
  alias: cdnAliasSchema.optional(),
  expiresInSeconds: z.number().int().positive().nullable().default(null),
  cacheTtlSeconds: z.number().int().min(0).default(24 * 60 * 60),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const createCdnTextAssetSchema = createCdnAssetOptionsSchema.extend({
  content: z.string().min(1, "Text content is required"),
});

export const createCdnFileAssetSchema = createCdnAssetOptionsSchema.extend({
  filename: z.string().trim().min(1, "Filename is required"),
  contentType: z.string().trim().min(1, "Content type is required"),
  size: z.number().int().min(1, "File cannot be empty"),
  uploadthingKey: z.string().trim().min(1, "UploadThing key is required"),
  uploadthingUrl: z.string().url("UploadThing URL must be valid"),
});

export const createCdnAssetResponseSchema = z.object({
  alias: z.string(),
  publicUrl: z.string().url(),
  storageKey: z.string(),
  expiresAt: z.string().datetime().nullable(),
  cacheControl: z.string(),
});

export type CreateCdnTextAssetInput = z.infer<typeof createCdnTextAssetSchema>;
export type CreateCdnFileAssetInput = z.infer<typeof createCdnFileAssetSchema>;
export type CreateCdnAssetResponse = z.infer<
  typeof createCdnAssetResponseSchema
>;
