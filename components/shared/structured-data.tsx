import React from "react";
import { getBaseUrl } from "@/lib/server-utils";

export default async function StructuredData() {
  const baseUrl = await getBaseUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LNNK",
    url: baseUrl,
    description:
      "Create short, branded, and secure links with LNNK. Professional URL shortener with analytics and custom domains.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "LNNK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}