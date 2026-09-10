import Link from "next/link";
import type { Cta } from "@/lib/types";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-medium tracking-wide transition-colors";

const variants = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  secondary: "border border-line text-ink hover:bg-surface-raised",
} as const;

export function Button({
  cta,
  variant = "primary",
}: {
  cta: Cta;
  variant?: keyof typeof variants;
}) {
  const className = `${base} ${variants[variant]}`;

  // tel: and mailto: are not app routes — Link would still work, but a plain
  // anchor is the honest element and avoids prefetch noise.
  if (cta.external || /^(tel:|mailto:|https?:)/.test(cta.href)) {
    return (
      <a
        className={className}
        href={cta.href}
        {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link className={className} href={cta.href}>
      {cta.label}
    </Link>
  );
}
