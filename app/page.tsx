import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base flex flex-col items-center">
      <Navbar />
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6">
        <Hero />
      </div>
    </main>
  );
}
