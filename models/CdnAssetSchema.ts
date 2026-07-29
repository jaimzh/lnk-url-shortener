import { Schema, model, models } from "mongoose";

export const CDN_ASSET_KINDS = ["file", "text"] as const;
export const CDN_ASSET_PROVIDERS = [
  "uploadthing",
  "cloudinary",
  "cloudflare-r2",
  "vercel-blob",
] as const;
export const CDN_ASSET_STATUSES = ["pending", "ready", "failed", "deleted"] as const;

export type CdnAssetKind = (typeof CDN_ASSET_KINDS)[number];
export type CdnAssetProvider = (typeof CDN_ASSET_PROVIDERS)[number];
export type CdnAssetStatus = (typeof CDN_ASSET_STATUSES)[number];

const CdnAssetSchema = new Schema(
  {
    alias: { type: String, required: true, unique: true, index: true },
    kind: {
      type: String,
      enum: CDN_ASSET_KINDS,
      required: true,
    },
    originalName: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },

    provider: {
      type: String,
      enum: CDN_ASSET_PROVIDERS,
      required: true,
    },
    storageKey: { type: String, required: true },
    publicUrl: { type: String, required: true },

    cacheTtlSeconds: { type: Number, required: true, min: 0 },
    cacheControl: { type: String, required: true },
    expiresAt: { type: Date, default: null, index: true },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
      required: true,
    },
    status: {
      type: String,
      enum: CDN_ASSET_STATUSES,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

CdnAssetSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { expiresAt: { $type: "date" } },
  },
);

export const CdnAsset =
  models.CdnAsset || model("CdnAsset", CdnAssetSchema);

export interface CdnAssetDoc {
  _id: unknown;
  alias: string;
  kind: CdnAssetKind;
  originalName: string;
  contentType: string;
  size: number;
  provider: CdnAssetProvider;
  storageKey: string;
  publicUrl: string;
  cacheTtlSeconds: number;
  cacheControl: string;
  expiresAt: Date | null;
  visibility: "public" | "private";
  status: CdnAssetStatus;
  createdAt: Date;
  updatedAt: Date;
}
