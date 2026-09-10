import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections";
import { getAllPageSlugs, getPage } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

/** Every page is statically generated; swapping in Sanity keeps this working. */
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
