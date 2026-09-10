import Link from "next/link";
import type { Cta } from "@/lib/types";

/**
 * The outlined, letterspaced caps button used site-wide ("VIEW MORE",
 * "VIEW ALL", "BOOK NOW"). Hover fills with gold and inverts to the ink
 * ground, which is the theme's own hover behaviour.
 *
 * min-h-12 keeps it above the 44px touch-target floor at every size — the
 * original renders around 38px tall on mobile.
 */
const base =
  "inline-flex min-h-12 items-center justify-center border px-8 py-3 text-xs transition-colors duration-300 u-caps";

const variants = {
  gold: "border-gold/60 text-gold hover:bg-gold hover:text-ink hover:border-gold",
  light:
    "border-white/50 text-white hover:bg-white hover:text-ink hover:border-white",
} as const;

export type ButtonVariant = keyof typeof variants;

export function Button({
  cta,
  variant = "gold",
  className = "",
}: {
  cta: Cta;
  variant?: ButtonVariant;
  className?: string;
}) {
  const cn = `${base} ${variants[variant]} ${className}`;

  // tel:, mailto: and off-site URLs are not app routes; a plain anchor is the
  // honest element and skips needless prefetching.
  if (cta.external || /^(tel:|mailto:|https?:)/.test(cta.href)) {
    return (
      <a
        className={cn}
        href={cta.href}
        {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link className={cn} href={cta.href}>
      {cta.label}
    </Link>
  );
}
