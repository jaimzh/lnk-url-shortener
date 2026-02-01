import dbConnect from "@/lib/db";
import { Url } from "@/models/UrlSchema";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  await dbConnect();

  const { code } = await params;

  const urlEntry = await Url.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } },
    { new: true },
  );

  if (!urlEntry) {
    notFound();
  }

  redirect(urlEntry.originalUrl);
}
