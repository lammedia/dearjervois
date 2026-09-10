import type { ReactNode } from "react";

/**
 * The single source of horizontal rhythm. Every section uses this rather than
 * setting its own padding, which is what keeps gutters consistent across the
 * site at every width.
 */
export function Container({
  children,
  width = "default",
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow"
      ? "max-w-2xl"
      : width === "wide"
        ? "max-w-7xl"
        : "max-w-5xl";

  return <div className={`mx-auto w-full ${max} px-5 sm:px-8`}>{children}</div>;
}
