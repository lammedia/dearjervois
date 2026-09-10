import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections";
import { getPage } from "@/lib/content";

export default async function HomePage() {
  const page = await getPage("");
  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
