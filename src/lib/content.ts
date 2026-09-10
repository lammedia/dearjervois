import { pages } from "@/content/pages";
import { site } from "@/content/site";
import type { Page, SiteSettings } from "@/lib/types";

/**
 * The one seam between the app and its content source.
 *
 * Every page and component reads content through these three functions and
 * nothing else — no component imports `@/content/*` directly. Pointing the site
 * at Sanity therefore means replacing the bodies here (a `client.fetch(groq)`
 * per function) and touching nothing in `src/app` or `src/components`.
 *
 * The functions are async today precisely so that swap needs no call-site
 * changes.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  return site;
}

export async function getPage(slug: string): Promise<Page | null> {
  return pages.find((page) => page.slug === slug) ?? null;
}

export async function getAllPageSlugs(): Promise<string[]> {
  return pages.map((page) => page.slug);
}
