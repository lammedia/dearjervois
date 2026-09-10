import { MenuBlock } from "@/components/sections/MenuBlock";
import { Booking } from "@/components/sections/Booking";
import { Hero } from "@/components/sections/Hero";
import { MenuTeaser } from "@/components/sections/MenuTeaser";
import { Gallery, Hours, Prose, Split } from "@/components/sections/Simple";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Section as SectionData } from "@/lib/types";

/**
 * One switch, keyed on `_type`, from a content block to a rendered section.
 * Adding a block type to the CMS means adding a case here and a schema in
 * `sanity/schemas` — nothing else in the app changes.
 */
export function SectionRenderer({ sections }: { sections: SectionData[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} {...section} />;
          case "prose":
            return <Prose key={section._key} {...section} />;
          case "split":
            return <Split key={section._key} {...section} />;
          case "testimonials":
            return <Testimonials key={section._key} {...section} />;
          case "menuTeaser":
            return <MenuTeaser key={section._key} {...section} />;
          case "booking":
            return <Booking key={section._key} {...section} />;
          case "gallery":
            return <Gallery key={section._key} {...section} />;
          case "hours":
            return <Hours key={section._key} {...section} />;
          case "menuBlock":
            return <MenuBlock key={section._key} {...section} />;
        }
      })}
    </>
  );
}
