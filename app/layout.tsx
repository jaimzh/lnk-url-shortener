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
  title: "LNNK - Shorten the long",
  description: "Turn long URLs into short, shareable links.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LNNK - Shorten the long",
    description: "Turn long URLs into short, shareable links.",
    url: "https://lnnk.click",
    siteName: "LNNK",
    images: [
      {
        url: "https://lnnk.click/lnnk-wide.png",
        width: 1200,
        height: 630,
        alt: "LNNK - Link Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LNNK - Shorten the long",
    description: "Turn long URLs into short, shareable links.",
    images: ["https://lnnk.click/lnnk-wide.png"],
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
