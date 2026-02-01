import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        {/* Decorative background glow */}
        <div className="absolute -inset-10 bg-accent/20 blur-3xl rounded-full" />

        <h1 className="relative text-[10rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 sm:text-[16rem]">
          404
        </h1>
      </div>

      <div className="z-10 max-w-md">
        <h2 className="mb-4 text-2xl font-semibold text-white tracking-tight">
          Link Not Found
        </h2>
        <p className="mb-8 text-neutral-400 leading-relaxed font-light">
          The short link you're looking for doesn't exist or has expired. Check
          the URL for typos or create a new short link.
        </p>

        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
        >
          Back to Lnk
        </Link>
      </div>
    </main>
  );
}
