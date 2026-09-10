import type { MetadataRoute } from "next";
import { getAllPageSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPageSlugs();

  return slugs.map((slug) => ({
    url: `https://www.dearjervois.net/${slug}`,
    lastModified: new Date(),
  }));
}
