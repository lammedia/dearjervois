import type { ReactNode } from "react";
import { Container } from "@/components/Container";

/**
 * Vertical rhythm plus the section ground colour. The /2026/ page is a stack
 * of full-bleed colour bands, so ground is a property of the section rather
 * than of the page.
 */
const grounds = {
  navy: "bg-navy",
  teal: "bg-teal",
  ink: "bg-ink",
  none: "",
} as const;

export function Section({
  children,
  width,
  ground = "ink",
  size = "default",
  labelledBy,
  id,
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
  ground?: keyof typeof grounds;
  size?: "default" | "large" | "flush";
  labelledBy?: string;
  id?: string;
}) {
  const pad =
    size === "flush"
      ? ""
      : size === "large"
        ? "py-20 sm:py-28 lg:py-36"
        : "py-16 sm:py-20 lg:py-24";

  return (
    <section id={id} aria-labelledby={labelledBy} className={`${grounds[ground]} ${pad}`}>
      <Container width={width}>{children}</Container>
    </section>
  );
}
