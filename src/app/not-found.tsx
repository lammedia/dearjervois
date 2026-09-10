import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section size="large" width="narrow">
      <h1 className="font-display text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-5 text-ink-muted">
        That page has moved or never existed. Try the menu, or head back to the
        start.
      </p>
      <div className="mt-8">
        <Button cta={{ label: "Back to home", href: "/" }} />
      </div>
    </Section>
  );
}
