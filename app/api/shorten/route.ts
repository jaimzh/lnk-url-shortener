import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { Url } from "@/models/UrlSchema";
import { urlSchema } from "@/schemas/url";

import { getBaseUrl } from "@/lib/server-utils";

export async function POST(request: NextRequest) {
  const baseUrl = await getBaseUrl();

  try {
    await dbConnect();
    const body = await request.json();

    const validation = urlSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error.issues[0].message }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { url: originalUrl, alias } = validation.data;

    let shortCode = alias || nanoid(6);

    // If custom alias is provided, check if it already exists
    if (alias) {
      const existing = await Url.findOne({ shortCode: alias });
      if (existing) {
        return new Response(
          JSON.stringify({ error: "Alias is already taken" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    } else {
      // If no alias, ensures nanoid doesn't collide (very unlikely but good practice)
      let exists = true;
      while (exists) {
        const checkExisting = await Url.findOne({ shortCode });
        if (!checkExisting) {
          exists = false;
        } else {
          shortCode = nanoid(6);
        }
      }
    }

    await Url.create({
      originalUrl,
      shortCode,
    });

    return new Response(
      JSON.stringify({
        originalUrl,
        shortUrl: `${baseUrl}/${shortCode}`,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error shortening URL:", error);
    return new Response("Failed to shorten URL", { status: 500 });
  }
}
