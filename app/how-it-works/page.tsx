import HowItWorksClient from "@/components/features/how-it-works/how-it-works-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import path from "path";
import fs from "fs/promises";

export default async function HowItWorks() {
  
  
  
  const filePath = path.join(process.cwd(),"HOW_IT_WORKS.md");
  const markdown = await fs.readFile(filePath, "utf-8");
  return (
    <main className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <Link href="/" className="flex items-center gap-2 text-text-muted mb-12">
        <ArrowLeft size={18} />
        Back to Home
      </Link>
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-text-base">
          How <span className="text-accent">lnk</span> works 
        </h1>
        (still cooking tho)
      </header>
     
      <HowItWorksClient markdownContent={markdown} />
    </main>
  );
}
