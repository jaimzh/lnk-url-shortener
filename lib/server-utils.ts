import { headers } from "next/headers";

export async function getBaseUrl() {
  
  if (process.env.BASE_URL && process.env.NODE_ENV === "production") {
    return process.env.BASE_URL.replace(/\/$/, "");
  }

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}
