import { headers } from "next/headers";

export async function getBaseUrl() {
  if (process.env.BASE_URL && process.env.NODE_ENV === "production") {
    return process.env.BASE_URL.replace(/\/$/, "");
  }

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "development" ? "http" : "https");

  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  }

  return `${protocol}://${host}`.replace(/\/$/, "");
}