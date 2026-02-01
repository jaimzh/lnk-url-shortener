import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { HeroProvider } from "@/context/HeroContext";
import BrownianParticles from "@/components/animations/brownian-particles";
import Preloader from "@/components/shared/preloader";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "LNK — Shorten the long",
  description: "Turn long URLs into short, shareable links.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <HeroProvider>
          <Preloader />
          <BrownianParticles />
          {children}
        </HeroProvider>
      </body>
    </html>
  );
}
