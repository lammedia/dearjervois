import type { ReactNode } from "react";
import { Container } from "@/components/Container";

/** Vertical rhythm wrapper. Pairs with Container so spacing stays uniform. */
export function Section({
  children,
  width,
  size = "default",
  labelledBy,
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
  size?: "default" | "large";
  labelledBy?: string;
}) {
  const pad = size === "large" ? "py-20 sm:py-28" : "py-14 sm:py-20";

  return (
    <section aria-labelledby={labelledBy} className={pad}>
      <Container width={width}>{children}</Container>
    </section>
  );
}
