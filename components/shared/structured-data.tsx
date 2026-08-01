import React from "react";
import { getBaseUrl } from "@/lib/server-utils";

export default async function StructuredData() {
  const baseUrl = await getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "LNNK",
        url: baseUrl,
        logo: `${baseUrl}/android-chrome-512x512.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: "LNNK",
        url: baseUrl,
        description:
          "LNNK helps people create custom short links and CDN asset links for sharing URLs, images, files, and other web assets.",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#app`,
        name: "LNNK",
        url: baseUrl,
        description:
          "A custom URL shortener and CDN link hosting tool for branded links, shareable file links, click tracking, QR codes, and asset delivery.",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Works in modern browsers.",
        featureList: [
          "Custom URL shortening",
          "Branded short links",
          "CDN asset links for files and images",
          "Click tracking",
          "QR code generation",
          "Configurable cache and expiry controls",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

