import type { ReactNode } from "react";

/**
 * The single source of horizontal rhythm, at the WordPress theme's own
 * 1260px content width. Every section composes this rather than setting its
 * own padding, which is what keeps gutters identical across the site.
 */
export function Container({
  children,
  width = "default",
  className = "",
}: {
  children: ReactNode;
  width?: "default" | "narrow" | "wide";
  className?: string;
}) {
  const max =
    width === "narrow"
      ? "max-w-3xl"
      : width === "wide"
        ? "max-w-[1440px]"
        : "max-w-site";

  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}
