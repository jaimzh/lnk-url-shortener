import { headers } from "next/headers";

const CANONICAL_BASE_URL = "https://lnnk.click";
const LEGACY_BASE_URL = "https://lnk.pxxl.click";
const LEGACY_HOST = "lnk.pxxl.click";

function normalizeBaseUrl(url: string) {
  const normalizedUrl = url.replace(/\/$/, "");

  if (normalizedUrl === LEGACY_BASE_URL) {
    return CANONICAL_BASE_URL;
  }

  return normalizedUrl;
}

export async function getBaseUrl() {
  if (process.env.BASE_URL && process.env.NODE_ENV === "production") {
    return normalizeBaseUrl(process.env.BASE_URL);
  }

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "development" ? "http" : "https");

  if (!host) {
    return normalizeBaseUrl(
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    );
  }

  if (host === LEGACY_HOST) {
    return CANONICAL_BASE_URL;
  }

  return normalizeBaseUrl(`${protocol}://${host}`);
}
