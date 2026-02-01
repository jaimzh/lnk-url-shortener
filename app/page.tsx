import { DashboardTable } from "@/components/features/dashboard/dashboard-table";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

import { SectionSeparator } from "@/components/shared/section-separator";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6">
        <Hero />

        <SectionSeparator label="Recent History" />

        <DashboardTable searchParams={searchParams} />
      </div>
      <Footer />
    </main>
  );
}
