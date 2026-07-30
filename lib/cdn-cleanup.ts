import { UTApi } from "uploadthing/server";
import dbConnect from "@/lib/db";
import { Cdn } from "@/models/CdnSchema";

const DELETE_BATCH_SIZE = 100;

type ExpiredCdnAsset = {
  _id: unknown;
  storageKey: string;
};

type CleanupExpiredCdnAssetsOptions = {
  now?: Date;
  dryRun?: boolean;
};

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

async function dropImmediateExpiryIndex() {
  const indexes = await Cdn.collection.indexes();
  const ttlIndex = indexes.find((index) => {
    const key = index.key as Record<string, unknown> | undefined;

    return key?.expiresAt === 1 && typeof index.expireAfterSeconds === "number";
  });

  if (!ttlIndex?.name) return false;

  await Cdn.collection.dropIndex(ttlIndex.name);
  return true;
}

export async function cleanupExpiredCdnAssets({
  now = new Date(),
  dryRun = false,
}: CleanupExpiredCdnAssetsOptions = {}) {
  await dbConnect();

  const droppedImmediateExpiryIndex = dryRun
    ? false
    : await dropImmediateExpiryIndex();

  const expiredAssets = await Cdn.find({
    expiresAt: { $type: "date", $lte: now },
    provider: "uploadthing",
    status: { $ne: "deleted" },
  })
    .select("_id storageKey")
    .lean<ExpiredCdnAsset[]>();

  if (expiredAssets.length === 0) {
    return {
      scanned: 0,
      deletedFiles: 0,
      deletedRecords: 0,
      droppedImmediateExpiryIndex,
      dryRun,
    };
  }

  if (dryRun) {
    return {
      scanned: expiredAssets.length,
      deletedFiles: 0,
      deletedRecords: 0,
      droppedImmediateExpiryIndex,
      dryRun,
    };
  }

  const utapi = new UTApi();
  const idsToDelete: unknown[] = [];
  let deletedFiles = 0;

  for (const assetBatch of chunk(expiredAssets, DELETE_BATCH_SIZE)) {
    const storageKeys = assetBatch.map((asset) => asset.storageKey);
    const result = await utapi.deleteFiles(storageKeys);

    if (!result.success) {
      throw new Error("UploadThing did not confirm file deletion");
    }

    deletedFiles += result.deletedCount;
    idsToDelete.push(...assetBatch.map((asset) => asset._id));
  }

  const deleteResult = await Cdn.deleteMany({ _id: { $in: idsToDelete } });

  return {
    scanned: expiredAssets.length,
    deletedFiles,
    deletedRecords: deleteResult.deletedCount ?? 0,
    droppedImmediateExpiryIndex,
    dryRun,
  };
}
