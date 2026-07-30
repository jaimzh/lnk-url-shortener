import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Cdn } from "@/models/CdnSchema";

export const runtime = "nodejs";

function getProviderUrl(cdn: { providerUrl?: string | null; provider?: string; storageKey?: string }) {
  if (cdn.providerUrl) return cdn.providerUrl;

  if (cdn.provider === "uploadthing" && cdn.storageKey) {
    return `https://utfs.io/f/${cdn.storageKey}`;
  }

  return null;
}

interface CdnRouteContext {
  params: Promise<{
    alias: string;
  }>;
}

export async function GET(_request: NextRequest, context: CdnRouteContext) {
  const { alias } = await context.params;

  try {
    await dbConnect();

    const cdn = await Cdn.findOne({ alias, status: "ready" });

    if (!cdn) {
      return NextResponse.json({ error: "CDN asset not found" }, { status: 404 });
    }

    if (cdn.expiresAt && cdn.expiresAt.getTime() <= Date.now()) {
      return NextResponse.json({ error: "CDN asset has expired" }, { status: 410 });
    }

    if (cdn.visibility === "private") {
      return NextResponse.json({ error: "CDN asset is private" }, { status: 403 });
    }

    const providerUrl = getProviderUrl(cdn);

    if (!providerUrl) {
      return NextResponse.json(
        { error: "CDN asset is missing a provider URL" },
        { status: 502 },
      );
    }

    await Cdn.updateOne({ _id: cdn._id }, { $inc: { clicks: 1 } });

    return NextResponse.redirect(providerUrl, {
      headers: {
        "Cache-Control": cdn.cacheControl,
      },
    });
  } catch (error) {
    console.error("Error loading CDN asset:", error);
    return NextResponse.json(
      { error: "Failed to load CDN asset" },
      { status: 500 },
    );
  }
}