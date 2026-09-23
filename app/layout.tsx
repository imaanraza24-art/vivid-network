import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/format";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Vivid Network — By Youth. For Youth.",
    template: "%s — Vivid Network"
  },
  description:
    "Vivid Network is a youth-led media platform creating space for teenagers to tell real stories, start conversations, explore culture, and make sense of growing up today.",
  openGraph: {
    title: "Vivid Network — By Youth. For Youth.",
    description:
      "Real stories. Real teens. Real impact. A youth-led media platform for articles, interviews, and the Vivid Voices podcast.",
    siteName: "Vivid Network",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivid Network — By Youth. For Youth.",
    description: "Real stories. Real teens. Real impact."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink font-body text-bone antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
