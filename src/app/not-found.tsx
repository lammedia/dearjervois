import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";

export default function NotFound() {
  return (
    <Section ground="ink" size="large" width="narrow">
      <div className="pt-20">
        <SectionTitle
          as="h1"
          eyebrow="Well, this is awkward"
          title="Page not found"
          id="page-title"
        />
        <p className="mt-8 text-center leading-[1.9] text-body-muted">
          That page has moved or never existed. Try the menu, or head back to
          the start.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button cta={{ label: "Back to home", href: "/" }} />
          <Button cta={{ label: "View the menu", href: "/menu" }} />
        </div>
      </div>
    </Section>
  );
}
