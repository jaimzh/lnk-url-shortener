import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-xl font-extrabold tracking-tighter text-text-base hover:opacity-80 transition-opacity"
      >
        lnk<span className="text-accent">.</span>
      </Link>

      <Link
        href="/how-it-works"
        className="p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-accent transition-all group"
        title="How it works"
      >
        <HelpCircle
          size={22}
          strokeWidth={1.5}
          className="group-hover:rotate-12 transition-transform"
        />
      </Link>
    </nav>
  );
}
