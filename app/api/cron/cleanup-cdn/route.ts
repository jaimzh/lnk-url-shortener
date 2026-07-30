import { NextRequest, NextResponse } from "next/server";
import { cleanupExpiredCdnAssets } from "@/lib/cdn-cleanup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret && process.env.NODE_ENV !== "production") {
    return true;
  }

  if (!cronSecret) {
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dryRun = request.nextUrl.searchParams.get("dryRun") === "true";
    const result = await cleanupExpiredCdnAssets({ dryRun });

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Error cleaning up expired CDN assets:", error);

    return NextResponse.json(
      { error: "Failed to clean up expired CDN assets" },
      { status: 500 },
    );
  }
}
