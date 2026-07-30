import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import {
  createCdnAssetIdentity,
  getCdnCacheControl,
  getCdnExpiresAt,
} from "@/lib/cdn-assets";
import { getBaseUrl } from "@/lib/server-utils";
import { Cdn } from "@/models/CdnSchema";
import {
  createCdnFileAssetSchema,
  createCdnTextAssetSchema,
} from "@/schemas/cdn-asset";
import type {
  CreateCdnFileAssetInput,
  CreateCdnTextAssetInput,
} from "@/schemas/cdn-asset";

export const runtime = "nodejs";

function isTextAssetData(
  data: CreateCdnTextAssetInput | CreateCdnFileAssetInput,
): data is CreateCdnTextAssetInput {
  return "content" in data;
}

function getValidationSchema(body: unknown) {
  if (body && typeof body === "object" && "content" in body) {
    return createCdnTextAssetSchema;
  }

  return createCdnFileAssetSchema;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const schema = getValidationSchema(body);
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    await dbConnect();

    const baseUrl = await getBaseUrl();
    const assetData = validation.data as
      | CreateCdnTextAssetInput
      | CreateCdnFileAssetInput;
    const isTextAsset = isTextAssetData(assetData);
    const kind = isTextAsset ? "text" : "file";
    const identity = isTextAsset
      ? createCdnAssetIdentity({
          alias: assetData.alias,
          baseUrl,
          kind,
        })
      : createCdnAssetIdentity({
          alias: assetData.alias,
          baseUrl,
          kind,
          filename: assetData.filename,
        });
    const expiresAt = getCdnExpiresAt(assetData.expiresInSeconds);
    const cacheControl = getCdnCacheControl(assetData.cacheTtlSeconds);

    const existing = await Cdn.findOne({ alias: identity.alias });
    if (existing) {
      return NextResponse.json(
        { error: "Alias is already taken" },
        { status: 400 },
      );
    }

    if (isTextAsset) {
      return NextResponse.json(
        { error: "Text must be uploaded as a file before saving metadata" },
        { status: 400 },
      );
    }

    const cdn = await Cdn.create({
      alias: identity.alias,
      kind,
      originalName: identity.originalName,
      contentType: assetData.contentType,
      size: assetData.size,
      provider: "uploadthing",
      storageKey: assetData.uploadthingKey,
      providerUrl: assetData.uploadthingUrl,
      publicUrl: identity.publicUrl,
      cacheTtlSeconds: assetData.cacheTtlSeconds,
      cacheControl,
      expiresAt,
      visibility: assetData.visibility,
      status: "ready",
    });

    return NextResponse.json(
      {
        alias: cdn.alias,
        originalName: cdn.originalName,
        storageKey: cdn.storageKey,
        publicUrl: cdn.publicUrl,
        expiresAt: cdn.expiresAt?.toISOString() ?? null,
        cacheControl: cdn.cacheControl,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating CDN asset:", error);
    return NextResponse.json(
      { error: "Failed to create CDN asset" },
      { status: 500 },
    );
  }
}
