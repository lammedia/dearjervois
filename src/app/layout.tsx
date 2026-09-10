import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

/*
 * PLACEHOLDER TYPEFACES. The live site's fonts could not be sampled, so these
 * are neutral stand-ins wired through the same CSS variables the tokens use —
 * swapping them is a change to this file plus `--font-display`/`--font-body`.
 * Self-hosted by next/font, so no render-blocking third-party request.
 */
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dearjervois.net"),
  title: {
    default: "Dear Jervois Cafe — Herne Bay, Auckland",
    template: "%s — Dear Jervois",
  },
  description:
    "A casual dining space on Jervois Road, Herne Bay, catering for all diets with organic New Zealand ingredients and fresh local produce.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteSettings();

  return (
    <html lang="en-NZ" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader name={site.name} nav={site.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
