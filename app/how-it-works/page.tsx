import Link from "next/link";
import { ArrowLeft, Zap, Shield, BarChart3, Globe } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "1. Paste your link",
      description: "Enter any long URL into the input field on the home page.",
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "2. Shorten & Customize",
      description:
        "Click shorten or provide a custom alias to make your link unique.",
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "3. Share Securely",
      description:
        "Copy your new link and share it anywhere. Your links are safe and fast.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
      title: "4. Track Analytics",
      description:
        "Monitor your link's performance with real-time click tracking.",
    },
  ];

  return (
    <main className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-base transition-colors mb-12 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Home</span>
      </Link>

      <header className="mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-base mb-6">
          How <span className="text-accent">lnk</span> works
        </h1>
        <p className="text-lg text-text-muted max-w-2xl leading-relaxed font-light">
          Shortening links shouldn&apos;t be complicated. We built lnk to be the
          fastest, most beautiful way to manage your web connections.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-bg-base/30 border border-white/5 backdrop-blur-sm hover:border-accent/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-text-base mb-3 leading-tight">
              {step.title}
            </h3>
            <p className="text-text-muted leading-relaxed font-light text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <section className="p-12 rounded-[2.5rem] bg-linear-to-br from-accent/20 to-transparent border border-accent/10 text-center">
        <h2 className="text-3xl font-bold text-text-base mb-4">
          Ready to shorten?
        </h2>
        <p className="text-text-muted mb-8 max-w-lg mx-auto font-light">
          Join thousands of users who trust lnk for their daily link management
          needs.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-10 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
        >
          Get Started Now
        </Link>
      </section>
    </main>
  );
}
