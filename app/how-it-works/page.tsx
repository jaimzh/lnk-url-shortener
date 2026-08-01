import HowItWorksClient from "@/components/features/how-it-works/how-it-works-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import path from "path";
import fs from "fs/promises";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How LNNK Short Links and CDN Links Work",
  description:
    "Learn how LNNK creates custom short URLs, CDN asset links, secure redirects, QR codes, and trackable sharing links.",
};

export default async function HowItWorks() {
  const filePath = path.join(process.cwd(), "MY_THOUGHTS.md");
  const markdown = await fs.readFile(filePath, "utf-8");
  return (
    <main className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <Link href="/" className="flex items-center gap-2 text-text-muted mb-12">
        <ArrowLeft size={18} />
        Back
      </Link>
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-text-base">
          How <span className="text-accent">lnnk</span> works
        </h1>
        (still cooking tho)
      </header>

      <HowItWorksClient markdownContent={markdown} />
    </main>
  );
}

