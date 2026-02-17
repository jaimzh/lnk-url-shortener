import dbConnect from "@/lib/db";
import { Url } from "@/models/UrlSchema";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";

// metadata that bots read, so we just get the data from db
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode);
  const urlEntry = await Url.findOne({ shortCode: code });

  const DEFAULT_PREVIEW_IMAGE = "https://lnnk.click/lnnk-wide.png";

  if (!urlEntry || !urlEntry.brandingTitle) return {};

  const imageUrl = urlEntry.brandingImage || DEFAULT_PREVIEW_IMAGE;

  return {
    title: urlEntry.brandingTitle || undefined,
    description: urlEntry.brandingDescription || undefined,
    openGraph: {
      title: urlEntry.brandingTitle || undefined,
      description: urlEntry.brandingDescription || undefined,
      url: `https://lnnk.click/${code}`,
      siteName: "LNNK",
      images: [
        {
          url: imageUrl,
          width: imageUrl === DEFAULT_PREVIEW_IMAGE ? 1200 : undefined,
          height: imageUrl === DEFAULT_PREVIEW_IMAGE ? 630 : undefined,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: urlEntry.brandingTitle || undefined,
      description: urlEntry.brandingDescription || undefined,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  await dbConnect();

  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode);

  const urlEntry = await Url.findOne({ shortCode: code });

  if (!urlEntry) {
    notFound();
  }

  //  bot stuff
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const isBot = /bot|facebook|twitter|whatsapp|telegram|slack|discord/i.test(
    userAgent,
  );

  // If bot + custom branding = stay on page to show metadata
  if (isBot && urlEntry.brandingTitle) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
            Securely Redirecting to {new URL(urlEntry.originalUrl).hostname}...
          </p>
        </div>
      </div>
    );
  }

  // humman redirect
  await Url.updateOne({ _id: urlEntry._id }, { $inc: { clicks: 1 } });
  redirect(urlEntry.originalUrl);
}
