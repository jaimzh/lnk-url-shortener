import mongoose, { Schema, model, models } from "mongoose";

export const CDN_KINDS = ["file", "text"] as const;
export const CDN_PROVIDERS = [
  "uploadthing",
  "cloudinary",
  "cloudflare-r2",
  "vercel-blob",
] as const;
export const CDN_STATUSES = ["pending", "ready", "failed", "deleted"] as const;

export type CdnKind = (typeof CDN_KINDS)[number];
export type CdnProvider = (typeof CDN_PROVIDERS)[number];
export type CdnStatus = (typeof CDN_STATUSES)[number];

const CdnSchema = new Schema(
  {
    alias: { type: String, required: true, unique: true, index: true },
    kind: {
      type: String,
      enum: CDN_KINDS,
      required: true,
    },
    originalName: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },

    provider: {
      type: String,
      enum: CDN_PROVIDERS,
      required: true,
    },
    storageKey: { type: String, required: true },
    providerUrl: { type: String, required: true },
    publicUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },

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
      enum: CDN_STATUSES,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

CdnSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { expiresAt: { $type: "date" } },
  },
);

if (
  models.Cdn &&
  (!models.Cdn.schema.path("providerUrl") || !models.Cdn.schema.path("clicks"))
) {
  mongoose.deleteModel("Cdn");
}

export const Cdn = models.Cdn || model("Cdn", CdnSchema, "cdns");

export interface CdnDoc {
  _id: unknown;
  alias: string;
  kind: CdnKind;
  originalName: string;
  contentType: string;
  size: number;
  provider: CdnProvider;
  storageKey: string;
  providerUrl: string;
  publicUrl: string;
  clicks: number;
  cacheTtlSeconds: number;
  cacheControl: string;
  expiresAt: Date | null;
  visibility: "public" | "private";
  status: CdnStatus;
  createdAt: Date;
  updatedAt: Date;
}
