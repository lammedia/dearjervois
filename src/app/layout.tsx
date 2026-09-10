import type { Metadata } from "next";
import { Cinzel, Jost, Parisienne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

/*
 * TYPEFACES — close matches, not confirmed originals.
 *
 * The live site is unreachable from this environment and the theme ZIP carries
 * only the previous design's Roboto Slab, so the /2026/ families could not be
 * read from source. These three were chosen against the screenshots:
 *
 *   Cinzel     — the letterspaced Trajan-style caps used for the logo, nav,
 *                section titles, buttons and menu item names. Very close.
 *   Parisienne — the script used for the hero line, section eyebrows and the
 *                testimonial body. Closest common match; see CONTENT-STATUS.md.
 *   Jost       — the light geometric sans used for body copy and form fields.
 *
 * Swapping any of them is a change to this file only — every component reads
 * --font-display / --font-script / --font-body from globals.css.
 */
const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dearjervois.net"),
  title: {
    default: "Dear Jervois — Cafe & Venue, Herne Bay, Auckland",
    template: "%s — Dear Jervois",
  },
  description:
    "A little taste of everything. A casual dining space on Jervois Road, Herne Bay, catering for all diets with organic New Zealand ingredients and fresh local produce.",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Dear Jervois",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteSettings();

  return (
    <html
      lang="en-NZ"
      className={`${display.variable} ${script.variable} ${body.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-ink">
        <a
          href="#main"
          className="u-caps sr-only text-xs focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader site={site} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
