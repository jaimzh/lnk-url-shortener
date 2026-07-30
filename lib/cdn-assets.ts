import { nanoid } from "nanoid";

interface CdnAssetIdentityOptions {
  alias?: string;
  baseUrl: string;
  kind: "file" | "text";
  filename?: string;
}

function getFileExtension(filename: string | undefined, fallback: string) {
  if (!filename) return fallback;

  const match = filename.match(/\.[a-z0-9]+$/i);
  return match?.[0].toLowerCase() ?? fallback;
}

function withExtension(alias: string, extension: string) {
  if (!extension) return alias;
  return alias.toLowerCase().endsWith(extension) ? alias : `${alias}${extension}`;
}

export function getCdnExpiresAt(expiresInSeconds: number | null) {
  if (!expiresInSeconds) return null;

  return new Date(Date.now() + expiresInSeconds * 1000);
}

export function getCdnCacheControl(cacheTtlSeconds: number) {
  return `public, max-age=${cacheTtlSeconds}`;
}

export function createCdnAssetIdentity({
  alias,
  baseUrl,
  kind,
  filename,
}: CdnAssetIdentityOptions) {
  const aliasBase = alias || nanoid(8);
  const extension = kind === "text" ? ".txt" : getFileExtension(filename, "");
  const assetName = withExtension(aliasBase, extension);

  return {
    alias: assetName,
    originalName: kind === "text" ? assetName : filename || assetName,
    publicUrl: `${baseUrl}/cdn/${assetName}`,
  };
}