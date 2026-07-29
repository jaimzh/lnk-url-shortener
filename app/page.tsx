import { DashboardTable } from "@/components/features/dashboard/dashboard-table";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SectionSeparator } from "@/components/shared/section-separator";
import StructuredData from "@/components/shared/structured-data";
import { ShortenerThemeProvider } from "@/components/features/shortener/shortener-theme-provider";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <StructuredData />
      <ShortenerThemeProvider className="flex flex-1 w-full flex-col items-center">
        <Navbar />
        <div className="flex flex-1 w-full flex-col items-center justify-center">
          <Hero />

          <SectionSeparator label="Recent History" />

          <DashboardTable searchParams={searchParams} />
        </div>
      </ShortenerThemeProvider>
      <Footer />
    </main>
  );
}
