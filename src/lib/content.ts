import { menus } from "@/content/menu";
import { pages } from "@/content/pages";
import { site } from "@/content/site";
import type { Menu } from "@/lib/menu/types";
import type { Page, SiteSettings } from "@/lib/types";

/**
 * The one seam between the app and its content source.
 *
 * Every page and component reads content through these functions and nothing
 * else — no component imports `@/content/*` directly. Pointing the site at
 * Sanity means replacing the bodies here (a `client.fetch(groq)` each) and
 * touching nothing in `src/app` or `src/components`.
 *
 * They are async today precisely so that swap needs no call-site changes.
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

/**
 * The structured menu, as produced by the PDF import pipeline. Kept separate
 * from `getPage` because a menu is a document in its own right with its own
 * version history, not a block of page copy.
 */
export async function getMenu(slug: string): Promise<Menu | null> {
  return menus.find((menu) => menu.slug === slug) ?? null;
}
